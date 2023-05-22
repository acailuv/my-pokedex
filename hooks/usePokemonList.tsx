import { PokemonListItem, ServerResponse } from "@/types/Responses";
import { message } from "antd";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

export default function usePokemonList(): [
  PokemonListItem[],
  number,
  Function,
  Function
] {
  const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
  const [totalPokemonCount, setTotalPokemonCount] = useState(0);
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon")
      .then((data: AxiosResponse<ServerResponse<PokemonListItem[]>>) => {
        setPokemonList(data.data.results);
        setTotalPokemonCount(data.data.count);
        setNextUrl(data.data.next);
        setPrevUrl(data.data.previous);
      })
      .catch(() => {
        message.error("Error while fetching pokemon list");
      });
  }, []);

  const nextPage = () => {
    axios
      .get(nextUrl)
      .then((data: AxiosResponse<ServerResponse<PokemonListItem[]>>) => {
        setPokemonList(data.data.results);
        setNextUrl(data.data.next);
        setPrevUrl(data.data.previous);
      });
  };

  const prevPage = () => {
    axios
      .get(prevUrl)
      .then((data: AxiosResponse<ServerResponse<PokemonListItem[]>>) => {
        setPokemonList(data.data.results);
        setNextUrl(data.data.next);
        setPrevUrl(data.data.previous);
      });
  };

  return [pokemonList, totalPokemonCount, nextPage, prevPage];
}
