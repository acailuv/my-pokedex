import { formatName } from "./formatName";

export function makeEvolutionTimelineItems(evolutionChain: any) {
  let start = evolutionChain.chain;
  const result = [
    {
      children: formatName(start.species.name),
    },
  ];

  while (start.evolves_to.length > 0) {
    result.push({
      children: formatName(start.evolves_to[0].species.name),
    });

    start = start.evolves_to[0];
  }

  return result;
}
