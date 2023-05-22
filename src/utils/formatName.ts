function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatName(name: string) {
  const parsedName = name.split("-");

  parsedName.forEach((element, i) => {
    parsedName[i] = capitalizeFirstLetter(element);
  });

  return parsedName.join(" ");
}
