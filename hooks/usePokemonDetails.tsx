import { message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

export default function usePokemonDetails(id?: string) {
  const [pokemonDetails, setPokemonDetails] = useState<any>();
  const [evolutionChain, setEvolutionChain] = useState<any>();

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .then((data) => {
        setPokemonDetails(data.data);
      })
      .catch(() => {
        message.error("Error while fetching pokemon details");
      });

    axios
      .get(`https://pokeapi.co/api/v2/evolution-chain/${id}/`)
      .then((data) => {
        setEvolutionChain(data.data);
      })
      .catch(() => {
        message.error("Error while fetching evolution chain");
      });
  }, [id]);

  return [pokemonDetails, evolutionChain];
}
