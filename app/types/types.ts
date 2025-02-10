export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export interface Breed {
  breed: string;
}

export interface User {
  username: string;
  email: string;
}

export interface SearchFilters {
  breed?: string;
  location?: string;
  sortBy?: "age" | "name";
}

export interface Location {
  zip_code: string;
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  county: string;
}

export interface Coordinates {
  lat: number;
  lon: number;
}

export interface DogResults {
  resultIds: string[];
  total: number;
  next: string;
  prev: string;
}

export type Options = {
  value: string; 
  label: string;
}