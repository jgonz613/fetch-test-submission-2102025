import React from "react";
import { Dog } from "../types/types";
import { useStore } from "../store/store";
import { FaHeart , FaHeartBroken } from "react-icons/fa";


interface FavoriteButtonType {
    dog: Dog;
}

const FavoriteButton = ({dog}: FavoriteButtonType) => {
  const addFavorite = useStore((state) => state.addFavorite);
  const removeFavorite = useStore((state) => state.removeFavorite);
  const favorites = useStore((state) => state.favorites);

  const handleFavorite = (dogId: string) => {
    if (favorites.includes(dogId)) {
      removeFavorite(dogId);
    } else {
      addFavorite(dogId);
    }
  };
  const isFavorite = favorites.includes(dog.id);

  return (
    <button className={`${isFavorite ? "text-gray-900  hover:text-blue-700" : "bg-red-500 hover:bg-red-700 text-white"}  font-bold p-1 rounded mb-2`} onClick={() => handleFavorite(dog.id)}>
      {isFavorite ? <><FaHeartBroken className="inline-block mr-2"/> Remove</> : <><FaHeart className="inline-block  mr-2"/>Favorite</>}
    </button>
  )
}

export default FavoriteButton