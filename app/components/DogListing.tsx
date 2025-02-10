import { Dog } from "../types/types";
import React from "react";
import DogCard from "./DogCard";

interface DogListingType {
  dogs: Dog[]
}

const DogListing = ({ dogs }: DogListingType) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 \ gap-2">
      {dogs && dogs.map((dog) => (<div key={dog.id}><DogCard dog={dog} /></div>))}
    </div>

  )
}

export default DogListing