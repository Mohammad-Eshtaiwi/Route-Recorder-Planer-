import "./App.css";

import "@arcgis/map-components/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-zoom";
import { createGraphic } from "./features/routing/utils/addGraphic";
import { MapSlot } from "./components/MapSlot";
import { Form } from "./features/routing/components/Form";
import { useMap } from "./states/mapContext";
import { FormProvider, useForm } from "react-hook-form";
import { Tabs } from "./components/tabs";
import { useTabs } from "./components/tabs/context";
import { useEffect, useRef } from "react";
import RouteRecorder from "./features/routeRecorder";

function App() {
  const { mapRef } = useMap();
  const { activeTab } = useTabs();
  const activeTabRef = useRef(activeTab);
  const methods = useForm<{ origin: string; destination: string }>({
    shouldUnregister: false,
  });

  // Keep the ref in sync with the latest activeTab
  useEffect(() => {
    activeTabRef.current = activeTab;
    const view = mapRef.current?.view;
    if (view) {
      view.graphics.removeAll();
      // methods.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const { setValue, getValues } = methods;

  const handleActiveGraphic = (mapPoint: __esri.Point, view: __esri.View) => {
    const { origin, destination } = getValues();

    const inputToFill = !origin
      ? "origin"
      : !destination
      ? "destination"
      : null;

    if (inputToFill) {
      const graphic = createGraphic(inputToFill, mapPoint);
      if (inputToFill === "destination") {
        console.log(mapPoint.longitude, "mapPoint.longitude");
      }
      setValue(
        inputToFill,
        mapPoint.latitude!.toString() + "," + mapPoint.longitude!.toString()
      );
      view?.graphics.add(graphic);
      return;
    }
  };

  const handleViewReady = () => {
    const view = mapRef.current?.view;
    view?.goTo({
      center: [144.9631, -37.8136], // Melbourne
      zoom: 14,
    });
    view?.on("click", ({ mapPoint }: __esri.ViewClickEvent) => {
      if (activeTabRef.current === "Route") {
        handleActiveGraphic(mapPoint, view);
      }
      if (activeTabRef.current === "Route Recorder") {
        console.log("will handle  different logic here");
      }
    });
  };

  return (
    <arcgis-map
      style={{ width: "100vw", height: "100vh" }}
      basemap="osm"
      onarcgisViewReadyChange={handleViewReady}
      ref={mapRef}
      name="my-map"
    >
      <arcgis-zoom slot="top-left"></arcgis-zoom>
      <MapSlot slot="top-right" style={{ width: "350px" }}>
        <Tabs
          initialTab="Route"
          tabs={[
            { label: "Route", isActive: true },
            { label: "Route Recorder", isActive: false },
          ]}
        />
        {activeTab === "Route" && (
          <FormProvider {...methods}>
            <Form />
          </FormProvider>
        )}
        {activeTab === "Route Recorder" && <RouteRecorder />}
      </MapSlot>
    </arcgis-map>
  );
}

export default App;
