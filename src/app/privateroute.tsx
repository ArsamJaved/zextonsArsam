// src/components/PrivateRoute.tsx
"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/app/context/Auth";
import { useSelector } from "react-redux";
// RootState type includes persisted reducers; _persist key is added by redux-persist
// We use a loose type here to avoid coupling to the exact RootState definition
type AnyState = { _persist?: { rehydrated?: boolean } } & Record<string, unknown>;
interface PrivateRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}
const PrivateRoute = ({
  children,
  redirectTo = "/login",
}: PrivateRouteProps) => {
  const { user } = useAuth();
  const router = useRouter();
  const rehydrated = useSelector((state: AnyState) => state._persist?.rehydrated);

  useEffect(() => {
    // Avoid redirecting until redux-persist has rehydrated the store in production
    if (rehydrated && !user) {
      router.push(redirectTo);
    }
  }, [rehydrated, user, redirectTo, router]);

  // If user is not authenticated, don't render the children
  if (!rehydrated || !user) {
    return null; 
  }
  return <>{children}</>;
};

export default PrivateRoute;
