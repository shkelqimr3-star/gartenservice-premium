import { Leaf, Scissors, Sprout, TreePine, Truck, type LucideIcon } from "lucide-react";

const icons: Record<string, LucideIcon> = {
  Leaf,
  Scissors,
  Sprout,
  TreePine,
  Truck,
};

export function ServiceIcon({ name }: { name?: string | null }) {
  const Icon = icons[name || "Leaf"] || Leaf;
  return <Icon className="h-6 w-6" strokeWidth={1.7} />;
}
