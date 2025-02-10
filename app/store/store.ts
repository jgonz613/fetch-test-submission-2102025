import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Dog, User } from "../types/types";
import { fetchDogsByIds } from "../lib/api";

interface Store {
  isAuthenticated: boolean;
  user: User | null;
  favorites: string[];
  breeds: string[];
  setBreeds: (breeds: string[]) => void;
  addDogs: (newDogs: Dog[]) => void;
  dogs: Dog[];// cached total dog details
  _hasHydrated: boolean;
  setHydrate: (hydrate: boolean)=>void;
    
  getDogsByIds: (ids: string[]) => Dog[];
  
  searchResults: string[];
  setSearchResults: (results: string[]) => void;
  dogDetailResults: Dog[]; // Dog details for current search results
  setDogDetailResults: (dogs: Dog[])=>void;

  matchedDog: Dog | null;
  setMatchedDog: (id: string)=>void;
  next: string;
  prev: string;
  total: number;
  page: number;
  numPage: number;
  setPage: (page: number) => void;
  
  setNext: (next: string) => void;
  setPrev: (prev: string) => void;
  setTotal: (total: number) => void;

  setAuth: (user: User) => void;
  logout: () => void;
  addFavorite: (dogId: string) => void;
  removeFavorite: (dogId: string) => void;
}

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      favorites: [],
      breeds: [],
      _hasHydrated: false,
      setHydrate: (hydrate) => {
        set({ _hasHydrated: hydrate });
      },
      setBreeds: (breeds: string[]) =>
        set((state) => {
          console.log("Setting breeds:", breeds);
          return { breeds };
        }),
      dogs: [],
      addDogs: (newDogs) =>
        set((state) => {
          const existingDogsIds = state.dogs.map((dog) => dog.id);
          const filteredDogs = newDogs.filter(
            (dog) => !existingDogsIds.includes(dog.id)
          );
          return { dogs: [...state.dogs, ...filteredDogs] };
        }),
      getDogsByIds: (ids) => {
        return get().dogs.filter((dog) => dog && ids.includes(dog.id));
      },
      dogDetailResults: [],
      setDogDetailResults: (dogs) => set({ dogDetailResults: dogs }),
      matchedDog: null,
      setMatchedDog: async (id) => {
        const dogDetails: Dog[] = get().getDogsByIds([id]);
        if (dogDetails.length) {
          set({matchedDog: dogDetails[0]});  
        }
      },

      next: "",
      prev: "",
      total: 0,
      page: 1,
      numPage: 24,
      setPage: (page) => {
        set({ page: page });
      },
      searchResults: [],
      setSearchResults: async (results) => {
        // get missing dog details on diginds
        const existingDogsMap = new Map(get().dogs.map((dog) => [dog.id, dog]));
        const missingDogIds = results.filter((id) => !existingDogsMap.has(id));
        let newDogs: Dog[] = [];

        if (missingDogIds.length > 0) {
          try {
            newDogs = await fetchDogsByIds(missingDogIds)
            console.log('fetching missing dog data', newDogs);
            get().addDogs(newDogs);
          } catch(e){
            console.log('error in getting dog fetchDogsByIds')
          }
        }
        // final list of dogs
        const dogDetails: Dog[] = get().getDogsByIds(results);

        set({searchResults: results, dogDetailResults: dogDetails});

      },
      setNext: (next) => {
        set({ next: next });
      },
      setPrev: (prev) => {
        set({ prev: prev });
      },
      setTotal: (total) => {
        set({ total: total });
      },

      setAuth: (user) => set({ isAuthenticated: true, user }),
      logout: () => set({ isAuthenticated: false, user: null, favorites: [], breeds:[], dogs:[] }),
      addFavorite: (dogId) =>
        set((state) => ({ favorites: [...state.favorites, dogId], matchedDog: null })),
      removeFavorite: (dogId) =>
        set((state) => ({
          favorites: state.favorites.filter((id) => id !== dogId),
          matchedDog: null
        })),
        
    }),
    {
      name: "dog-store",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHydrate(true) // THIS WORKS
      }
    }
  )
);
