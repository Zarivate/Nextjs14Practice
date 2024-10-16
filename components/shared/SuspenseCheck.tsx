import { Suspense } from "react";

export function SuspenseCheck({
  condition,
  fallback,
  children,
}: {
  condition: boolean;
  fallback: React.ReactNode;
  children: React.ReactNode;
}) {
  if (!condition) {
    return children;
  }

  return <Suspense fallback={fallback}>{children}</Suspense>;
}
