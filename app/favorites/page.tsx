"use client"
import { useEffect, useState } from "react";
import { useStore } from "../store/store";
import Link from "next/link";
import { Dog } from "../types/types";
import DogListing from "../components/DogListing";

const Match = () => {
    const favorites = useStore((state) => state.favorites);
    const getDogsByIds = useStore((state) => state.getDogsByIds);

    const hasHydrated = useStore((state) => state._hasHydrated);
    const [favoriteDogs, setFavoriteDogs] = useState<Dog[]>([]);
    useEffect(() => {
        if (hasHydrated) {
            setFavoriteDogs(getDogsByIds(favorites));
        }
    }, [hasHydrated, favorites]);

  if (!hasHydrated) return ('Loading');

  return (
    <div>

  
      <Link href="/search" className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-4 rounded"> Back to Search</Link>
      <h1 className="font-extrabold">Favorites</h1>

      <div>
        {favoriteDogs && <DogListing dogs={favoriteDogs}/>}
      </div>
    </div>
  );
};

export default Match;
