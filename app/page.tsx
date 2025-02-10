"use client";
import { useRouter } from "next/navigation";
import { useStore } from "./store/store";

export default function Home() {
  const router = useRouter();
  const isAuthenticated = useStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    router.replace("/search");
  } else {
    router.replace("/login");
  }
  return null;
}
