/// <reference types="@arcgis/map-components/types/react" />
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { MapProvider } from "./states/mapContext.tsx";
import { TabsProvider } from "./components/tabs/context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MapProvider>
      <TabsProvider>
        <App />
      </TabsProvider>
    </MapProvider>
  </StrictMode>
);
