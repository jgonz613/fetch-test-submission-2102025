import React from "react";
import { useStore } from "../store/store";
import { logoutApi } from "../lib/api";
import { useRouter } from "next/navigation";


const LogoutButton = () => {
  const router = useRouter();
  const logout = useStore((state) => state.logout);
  

  const handleLogout = () => {
    logoutApi().then(()=> {
      logout(); // zustand logout
      router.replace("/login");
    }).catch((error) => {
      router.replace("/login");
    });
  };


  return (
    <button
    className="hover:text-gray-500"
    onClick={handleLogout}
  >
    Logout
  </button>
  )
}

export default LogoutButton