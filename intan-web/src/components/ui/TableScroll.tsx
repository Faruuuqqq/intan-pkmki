import type { ReactNode } from "react";

export function TableScroll({
  label,
  children,
  className = "",
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <div
        className="overflow-x-auto focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember-dark"
        tabIndex={0}
        role="region"
        aria-label={label}
      >
        {children}
      </div>
      <p className="mt-2 text-xs text-steel-text sm:hidden">Geser tabel ke samping.</p>
    </div>
  );
}
