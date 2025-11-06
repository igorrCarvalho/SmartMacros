import { useEffect } from "react";
import { useRefreshToken } from "../queries/authentication/usePostRefresh";
import { useAuthenticationStore } from "../../stores/useAuthenticationStore";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const setHydrated = useAuthenticationStore((s) => s.setIsHydrated);
  const { mutate: refresh, isPending } = useRefreshToken({
    onSettled: () => setHydrated(true),
  });

  useEffect(() => {
    refresh();
  }, [refresh]);

  const isHydrated = useAuthenticationStore((s) => s.isHydrated);
  if (!isHydrated || isPending) {
    return <div className="grid place-items-center h-screen">Loading…</div>;
  }

  return <>{children}</>;
}