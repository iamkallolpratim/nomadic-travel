import { createElement } from "react";
import { getIcon, type IconKey } from "@/lib/icons";

export function Icon({ name, className = "h-4 w-4", label }: { name: IconKey | string; className?: string; label?: string }) {
  return createElement(getIcon(name), { className, "aria-hidden": label ? undefined : true, "aria-label": label, strokeWidth: 1.8 });
}
