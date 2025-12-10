import Graphic from "@arcgis/core/Graphic";

export function createGraphic(type: string, geometry: Graphic["geometry"]) {
  const graphic = new Graphic({
    // type: type,
    // geometry: geometry,
    geometry,
    symbol: {
      type: "simple-marker",
      color: type === "origin" ? "blue" : "red",
      size: "10px",
    },
    attributes: {
      role: type,
    },
  });
  return graphic;
}
