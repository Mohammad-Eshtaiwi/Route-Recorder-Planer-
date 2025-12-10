export interface RouteResponse {
  code: string;
  routes: Route[];
  waypoints: Waypoint[];
}

export interface Route {
  legs: RouteLeg[];
  weight_name: string;
  geometry: RouteGeometry;
  weight: number;
  duration: number;
  distance: number;
}

export interface RouteLeg {
  steps: RouteStep[];
  weight: number;
  summary: string;
  duration: number;
  distance: number;
}

export interface RouteStep {
  geometry?: RouteGeometry;
  maneuver?: Maneuver;
  mode?: string;
  driving_side?: string;
  name?: string;
  intersections?: Intersection[];
  weight?: number;
  duration?: number;
  distance?: number;
}

export interface Maneuver {
  bearing_after?: number;
  bearing_before?: number;
  location?: [number, number];
  modifier?: string;
  type?: string;
  instruction?: string;
}

export interface Intersection {
  out?: number;
  in?: number;
  entry?: boolean[];
  bearings?: number[];
  location?: [number, number];
}

export interface RouteGeometry {
  coordinates?: number[][];
  type?: string;
}

export interface Waypoint {
  hint: string;
  location: [number, number];
  name: string;
  distance: number;
}

