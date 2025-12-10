import { createContext, useContext, useRef, useState } from "react";
import type { ReactNode, RefObject } from "react";

interface MapContextType {
  mapRef: RefObject<HTMLArcgisMapElement | null>;
  isMapReady: boolean;
  setIsMapReady: (isMapReady: boolean) => void;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export function MapProvider({ children }: { children: ReactNode }) {
  const mapRef = useRef<HTMLArcgisMapElement>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  return (
    <MapContext.Provider value={{ mapRef, isMapReady, setIsMapReady }}>
      {children}
    </MapContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useMap() {
  const context = useContext(MapContext);
  if (context === undefined) {
    throw new Error("useMap must be used within a MapProvider");
  }
  return context;
}
