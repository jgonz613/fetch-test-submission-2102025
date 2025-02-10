"use client"
import { useEffect, useState } from "react";
import { useStore } from "../store/store";
import { useRouter } from "next/navigation";
import { fetchMatch } from "../lib/api";
import DogCard from "../components/DogCard";
import Link from "next/link";

const Match = () => {
    const router = useRouter();
  
  const matchedDog = useStore((state) => state.matchedDog);
  const setMatchedDog = useStore((state) => state.setMatchedDog);
  const favorites = useStore((state) => state.favorites);

  const hasHydrated = useStore((state) => state._hasHydrated);

  useEffect(() => {
    // if no match yet retreive a new match

    const getMatch = async () => {
      try {
        console.log(favorites);
        if (!matchedDog) {
          const data = await fetchMatch(favorites);
          console.log('getMatch', data);
          setMatchedDog(data.match);
        }

      } catch (error) {
        console.error("Error fetching dogs", error);
      }
    };

    if (hasHydrated && favorites.length === 0) {
      // Invalid use case redirect to search
      router.replace("/search");

    } else if (hasHydrated && !matchedDog) {
      getMatch();
    }



  }, [matchedDog, hasHydrated, favorites]);

  if (!hasHydrated) return ('Loading');

  return (
    <div>
      <Link href="/search" className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-4 rounded"> Back to Search</Link>

      <h1 className="font-extrabold">Match</h1>
      {matchedDog ? (
        <div>
          <h2>Matched Dog</h2>
          <DogCard dog={matchedDog}/>
        </div>
      ) : (
        <p>No match yet</p>
      )}
    </div>
  );
};

export default Match;
