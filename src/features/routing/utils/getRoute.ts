import Graphic from "@arcgis/core/Graphic";
import Polyline from "@arcgis/core/geometry/Polyline";
import { solve } from "./solve";

export async function getRoute(stops: Graphic[], view: __esri.View) {
  const prevRouteGraphic = view.graphics.find(
    (graphic) => graphic.attributes.role === "route"
  );
  if (prevRouteGraphic) {
    view.graphics.remove(prevRouteGraphic);
  }
  const coordinates = stops.reduce((acc, stop) => {
    if (stop.attributes.role === "route") {
      return acc;
    }
    const point = stop.geometry as __esri.Point;
    acc.push([point.longitude!, point.latitude!]);

    return acc;
  }, [] as number[][]);

  const routeResults = await solve(coordinates);

  // Convert GeoJSON LineString to Esri Polyline
  const polyline = new Polyline({
    paths: [routeResults.routes[0].geometry.coordinates!],
    spatialReference: { wkid: 4326 }, // WGS84
  });

  // Create a graphic with the polyline
  const routeGraphic = new Graphic({
    geometry: polyline,
    symbol: {
      type: "simple-line",
      color: [0, 0, 255], // blue
      width: 3,
    },
    attributes: {
      role: "route",
    },
  });
  view.graphics.add(routeGraphic);
}
