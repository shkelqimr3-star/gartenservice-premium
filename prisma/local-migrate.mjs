import { execFileSync } from "node:child_process";
import { createHash, randomUUID } from "node:crypto";
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { PrismaClient } from "@prisma/client";

const root = process.cwd();
const envPath = path.join(root, ".env");

if (existsSync(envPath)) {
  const env = readFileSync(envPath, "utf8");
  for (const line of env.split(/\r?\n/)) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (!match) continue;
    const [, key, rawValue] = match;
    process.env[key] ??= rawValue.replace(/^"|"$/g, "");
  }
}

const nameArgIndex = process.argv.indexOf("--name");
const migrationName = (nameArgIndex >= 0 ? process.argv[nameArgIndex + 1] : "init")
  ?.replace(/[^a-zA-Z0-9_-]/g, "_")
  .toLowerCase();

if (!process.env.DATABASE_URL?.startsWith("file:")) {
  throw new Error("local-migrate is intended for local SQLite DATABASE_URL values only.");
}

const migrationsDir = path.join(root, "prisma", "migrations");
mkdirSync(migrationsDir, { recursive: true });

const existingMigration = existsSync(migrationsDir)
  ? readdirSync(migrationsDir, { withFileTypes: true }).find(
      (entry) => entry.isDirectory() && entry.name.endsWith(`_${migrationName}`),
    )?.name
  : undefined;

let migrationDir = existingMigration ? path.join(migrationsDir, existingMigration) : "";
let migrationSqlPath = migrationDir ? path.join(migrationDir, "migration.sql") : "";

if (!migrationDir || !existsSync(migrationDir) || !existsSync(migrationSqlPath)) {
  const stamp = new Date().toISOString().replace(/[-:TZ.]/g, "").slice(0, 14);
  migrationDir = migrationDir && existsSync(migrationDir) ? migrationDir : path.join(migrationsDir, `${stamp}_${migrationName}`);
  migrationSqlPath = path.join(migrationDir, "migration.sql");
  mkdirSync(migrationDir, { recursive: true });
  const sql = execFileSync(
    "cmd.exe",
    ["/c", "npx", "prisma", "migrate", "diff", "--from-empty", "--to-schema-datamodel", "prisma/schema.prisma", "--script"],
    { cwd: root, encoding: "utf8" },
  )
    .split(/\r?\n/)
    .filter((line) => !line.startsWith("warn "))
    .join("\n")
    .trim();
  writeFileSync(migrationSqlPath, `${sql}\n`, "utf8");
}

const sql = readFileSync(migrationSqlPath, "utf8");
const migrationFolderName = path.basename(migrationDir);
const checksum = createHash("sha256").update(sql).digest("hex");
const prisma = new PrismaClient();

function splitSql(input) {
  return input
    .split(";")
    .map((statement) =>
      statement
        .split(/\r?\n/)
        .filter((line) => !line.trim().startsWith("--"))
        .join("\n")
        .trim(),
    )
    .filter(Boolean);
}

try {
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "checksum" TEXT NOT NULL,
      "finished_at" DATETIME,
      "migration_name" TEXT NOT NULL,
      "logs" TEXT,
      "rolled_back_at" DATETIME,
      "started_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "applied_steps_count" INTEGER NOT NULL DEFAULT 0
    )
  `);

  const applied = await prisma.$queryRawUnsafe(
    `SELECT "id" FROM "_prisma_migrations" WHERE "migration_name" = ? LIMIT 1`,
    migrationFolderName,
  );

  if (applied.length === 0) {
    const statements = splitSql(sql);
    for (const statement of statements) {
      await prisma.$executeRawUnsafe(statement);
    }

    await prisma.$executeRawUnsafe(
      `INSERT INTO "_prisma_migrations"
        ("id", "checksum", "finished_at", "migration_name", "logs", "rolled_back_at", "started_at", "applied_steps_count")
       VALUES (?, ?, CURRENT_TIMESTAMP, ?, NULL, NULL, CURRENT_TIMESTAMP, ?)`,
      randomUUID(),
      checksum,
      migrationFolderName,
      statements.length,
    );

    console.log(`Applied SQLite migration ${migrationFolderName}`);
  } else {
    console.log(`SQLite migration ${migrationFolderName} is already applied`);
  }
} finally {
  await prisma.$disconnect();
}
