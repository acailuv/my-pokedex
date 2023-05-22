export type ServerResponse<T> = {
  count: number;
  next: string;
  previous: string;
  results: T;
};

export type PokemonListItem = {
  name: string;
  url: string; // Details URL
};

export type PokemonSpecies = {
  name: string;
  url: string;
};

export type PokemonDetails = {
  id: number;
  name: string;
  height: number;
  weight: number;
  species: PokemonSpecies;
};
