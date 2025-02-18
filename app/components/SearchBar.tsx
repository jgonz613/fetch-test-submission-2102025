import React, { useState, useEffect } from "react";
import { useStore } from "../store/store";
import { fetchBreeds, fetchDogs } from "../lib/api";
import Link from "next/link";
import Select, { MultiValue } from "react-select";
import { Options } from "../types/types";

const SearchBar = () => {
  const breeds = useStore((state) => state.breeds);
  const setBreeds = useStore((state) => state.setBreeds);
  const setTotal = useStore((state) => state.setTotal);
  const setNext = useStore((state) => state.setNext);
  const setPrev = useStore((state) => state.setPrev);
  const setPage = useStore((state) => state.setPage);
  const setSearchResults = useStore((state) => state.setSearchResults);
  const page = useStore((state) => state.page);
  const numPage = useStore((state) => state.numPage);

  // optional age and zipcode
  const ageMin = useStore((state) => state.ageMin);
  const setAgeMin = useStore((state) => state.setAgeMin);

  const ageMax = useStore((state) => state.ageMax);
  const setAgeMax = useStore((state) => state.setAgeMax);

  const favorites = useStore((state) => state.favorites);
  const hasHydrated = useStore((state) => state._hasHydrated);

  // local use state  
  const [sortBy, setSortBy] = useState<"name" | "breed" | "age">("breed"); // Default to "breed"
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc"); // Default to "asc"
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]); // saving breeds locally

  const handleSelectChange = (selectedOptions: MultiValue<Options>) => {
    const breedSelected = selectedOptions.map(option => option.value);
    setPage(1);
    setSelectedBreeds(breedSelected);
  };

  useEffect(() => {
    if (hasHydrated && breeds.length === 0) {

      fetchBreeds()
        .then((data) => {
          setBreeds(data);
        })
        .catch((error) => {
          console.error("breed request error", error);
        });
    }
  }, [hasHydrated]);

  const breedSelect: Options[] = breeds.map((breed) => ({ value: breed, label: breed }));


  useEffect(() => {

    const fetchData = async () => {
      try {
        console.log("fetchData", page, numPage, sortBy, sortOrder, ageMin, ageMax, selectedBreeds);
        const data = await fetchDogs(numPage, page, sortBy, sortOrder, ageMin, ageMax, selectedBreeds);
        const { next, prev, resultIds, total } = data;
        setSearchResults(resultIds);
        setNext(next || "");
        setPrev(prev || "");
        setTotal(total);
      } catch (error) {
        console.log(error);
        if (error instanceof Error)
          console.error("Error fetching dogs", error.message);
        else
          console.error(error);

      }
    };

    if (hasHydrated) {
      fetchData();
    }
  }, [page, sortBy, sortOrder, numPage, selectedBreeds, ageMin, ageMax, hasHydrated]);

  // if (!hasHydrated) return (<div>Loading...</div>);


  return (
    <div>
      <Select
        className="mb-3"
        closeMenuOnSelect={false}
        isMulti
        options={breedSelect}
        placeholder="Select breeds to filter or nothing to select all"
        onChange={handleSelectChange}
      />
      <div className="flex space-x-4 items-center my-3">
        <label htmlFor="agemin" className="text-sm font-medium">Age Min</label>
        <input
          type="number"
          id="agemin"
          name="agemin"
          placeholder="Min"
          value={ageMin}
          className="border p-1 w-20 rounded"
          onChange={(e) => setAgeMin(parseInt(e.target.value) || 0)}
        />

        <label htmlFor="agemax" className="text-sm font-medium">Age Max</label>
        <input
          type="number"
          id="agemax"
          name="agemax"
          placeholder="Max"
          value={ageMax}
          className="border p-1 w-20 rounded"
          onChange={(e) => setAgeMax(parseInt(e.target.value) || 0)}
        />
      </div>

      <div className="flex flex-row my-3 min-h-[40px] justify-between">
        {favorites.length > 0 && (<Link href="/match" className="inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded justify-self-start"
        > Match</Link>)}

        <div className="flex space-x-4 ml-auto">
          <div>
            <label htmlFor="sortby-breed">Sort: </label>
            <select id="sortby-breed" onChange={(e) => setSortBy(e.target.value as "name" | "breed" | "age")}>
              <option value="breed">breed</option>
              <option value="name">name</option>
              <option value="age">age</option>
            </select>
          </div>
          <div>
            <label htmlFor="sortby-order">Order: </label>
            <select id="sortby-order" onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}>
              <option value="asc">asc</option>
              <option value="desc">desc</option>
            </select>
          </div>
        </div>


      </div>

    </div>

  )
}

export default SearchBar