"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../context/AuthContext";

export default function PublicRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, authLoading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && user) {
      router.replace("/dashboard");
    }
  }, [user, authLoading]);

  if (authLoading) return null;

  return <>{children}</>;
}
