import { routeUrl } from "../constants/baseUrl";
import type { RouteResponse } from "../types";

export async function solve(coordinates: number[][]): Promise<RouteResponse> {
  const response = await fetch(
    routeUrl + coordinates.join(";") + `?overview=full&geometries=geojson`
  )
    .then((res) => res.json())
    .then((data) => {
      return data;
    });

  return response;
}
