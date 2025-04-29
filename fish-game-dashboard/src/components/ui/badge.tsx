import { clsx } from "clsx";
import React from "react";

interface BadgeProps {
  label?: string;
}

const Badge = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & BadgeProps
>(({ className, label, ...props }, ref) => (
  <div
    ref={ref}
    className={clsx(
      "inline-flex items-center rounded-full border border-gray-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 dark:border-gray-800 dark:focus:ring-gray-300",
      className
    )}
    {...props}
  >
    <p className="font-medium text-sm text-nowrap">{label}</p>
  </div>
));
Badge.displayName = "Badge";

export default Badge;
