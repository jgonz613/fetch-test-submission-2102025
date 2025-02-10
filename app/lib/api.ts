import { Dog } from "../types/types";
import { useStore } from "../store/store";


export const unauthorizedGoToLogin = () => {
  console.log("Clearing data and redirecting to login");
  useStore.getState().logout();
  window.location.href = "/login";
};

export const loginUser = async (name:string, email:string) => {
  try {
    const response = await fetch(
      "https://frontend-take-home-service.fetch.com/auth/login",
      {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      }
    );

    if (!response.ok) {
      throw new Error('Login failed');
    }

    return response;
  } catch (error) {
    throw error;
  }
};



/**
 * Fetch Wrapper with 401 Redirect Handling if api expired as i do not have a token refresh
 */
const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  try {
    const response = await fetch(url, {
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });

    if (response.status === 401) {
      unauthorizedGoToLogin();
      return null; 
    }

    if (!response.ok) {
      throw new Error(`Request failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API request error (${url}):`, error);
    return null;
  }
};

export const fetchBreeds = async (): Promise<string[]> => {
  return (await fetchWithAuth("https://frontend-take-home-service.fetch.com/dogs/breeds")) || [];
};

export const logoutApi = async (): Promise<boolean> => {
  return !!(await fetchWithAuth("https://frontend-take-home-service.fetch.com/auth/logout", {
    method: "POST",
  }));
};

export const fetchDogsByIds = async (dogIds: string[]): Promise<Dog[]> => {
  return (await fetchWithAuth("https://frontend-take-home-service.fetch.com/dogs", {
    method: "POST",
    body: JSON.stringify(dogIds),
  })) || [];
};

export const fetchDogs = async (
  numPage: number,
  page: number,
  sortBy: "name" | "breed" | "age" = "breed",
  sortOrder: "asc" | "desc" = "asc",
  selectedBreeds: string[] = []
) => {
  const breedParams = selectedBreeds.length ? selectedBreeds.map(breed => `breeds[]=${encodeURIComponent(breed)}`).join("&") : '';
  const url = `https://frontend-take-home-service.fetch.com/dogs/search?size=${numPage}&from=${(page - 1) * numPage}&${breedParams}&sort=${sortBy}:${sortOrder}`;

  console.log("fetchDogs", url);
  return (await fetchWithAuth(url)) || [];
};

export const fetchMatch = async (favorites: string[] = []) => {
  console.log("Fetching match for", favorites);
  return (await fetchWithAuth("https://frontend-take-home-service.fetch.com/dogs/match", {
    method: "POST",
    body: JSON.stringify(favorites),
  })) || [];
};
