"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GrClose } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";
import LogoutButton from "./LogoutButton";
import { useStore } from "../store/store";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const isAuthenticated = useStore((state) => state.isAuthenticated);

  return (
    <header className="flex flex-row items-center justify-between  p-2 border-b-2 bg-gray-100">
      <Link
        href={isAuthenticated ? "/search": "/login"}
        className="flex items-center h-10 px-10 bg-gradient-to-r from-blue-900 via-blue-600 to-blue-500 rounded-tl-full rounded-br-full font-bold uppercase italic text-white hover:opacity-90"
      >
        Fetch Dog Matching
      </Link>
      <nav className="hidden sm:flex justify-between items-center gap-4 font-semibold">
        {isAuthenticated && <>
          <Link href="/search" className="hover:text-gray-500">
          Search
        </Link>
        <Link href="/favorites" className="hover:text-gray-500">
          Favorites
        </Link>
        <Link href="/match" className="hover:text-gray-500">
          Match
        </Link>
        <LogoutButton/>
        </>}
        
      </nav>
      <nav className="sm:hidden flex flex-col items-end gap-1 font-semibold">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="sm:hidden font-bold text-xl hover:text-gray-500"
        >
          {showMenu ? <GrClose /> : <GiHamburgerMenu />}
        </button>
        {isAuthenticated && showMenu && (
          <>
          <Link href="/search" className="hover:text-gray-500">
          Search
        </Link>
        <Link href="/favorites" className="hover:text-gray-500">
          Favorites
        </Link>
        <Link href="/match" className="hover:text-gray-500">
          Match
        </Link>
            <LogoutButton/>
          </>
        )}
      </nav>
    </header>
  )
}

export default Header