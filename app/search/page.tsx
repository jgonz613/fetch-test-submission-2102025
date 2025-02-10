"use client";
import { useStore } from "../store/store";
import DogListing from "../components/DogListing";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
const Search = () => {


  const dogDetailResults = useStore((state) => state.dogDetailResults);
  
  return (
    <div>
      <h1 className="font-extrabold">Search Dogs Page</h1>
      <SearchBar />
      <div>
        {dogDetailResults && <DogListing dogs={dogDetailResults}/>}
      </div>

      <Pagination/>

    </div>
  );
};

export default Search;
