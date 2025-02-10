import React from "react";
import { Dog } from "../types/types";
import FavoriteButton from "./FavoriteButton";

interface DogCardType {
  dog: Dog;
}

const DogCard = ({ dog }: DogCardType) => {
  return (
    <div className="flex flex-row items-center bg-white border border-gray-200 rounded-lg mb-4 shadow-sm md:flex-row md:max-w-m  h-full hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">

      <div className="w-full h-full max-w-[140px] flex items-center justify-center overflow-hidden bg-gray-100">        
        <img
          className="object-contain w-full h-auto max-h-[250px] md:max-h-none aspect-[4/5] rounded-t-lg md:rounded-l-lg"
          src={dog.img}
        alt={dog.name}
      />
      </div>
      <div className="flex flex-col justify-between px-6 ">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{dog.name}</h3>
        <div className="space-y-1 min-h-[120px]">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <strong>Age:</strong> {dog.age}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <strong>Zip:</strong> {dog.zip_code}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <strong>Breed:</strong> {dog.breed}
          </p>
        </div>
        <div className="mt-auto">
          <FavoriteButton dog={dog} />
        </div>
      </div>
    </div>
  );
};

export default DogCard;
