export function typeToColor(type: string) {
  switch (type) {
    case "grass":
      return "green";
    case "fire":
      return "orange";
    case "water":
      return "blue";
    default:
      return "grey";
  }
}
