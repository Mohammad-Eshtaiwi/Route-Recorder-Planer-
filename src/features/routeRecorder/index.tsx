import { useEffect, useRef } from "react";
import { useMap } from "../../states/mapContext";
import Polyline from "@arcgis/core/geometry/Polyline";
import Graphic from "@arcgis/core/Graphic";

function RouteRecorder() {
  const coordinatesRef = useRef<number[][]>([]);
  const startRecording = () => {
    navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        addPoint([longitude, latitude]);
      },
      (err) => console.error(err),
      { enableHighAccuracy: true }
    );
  };

  function addPoint(coords: number[]) {
    coordinatesRef.current.push(coords);

    const line = new Polyline({
      paths: [coordinatesRef.current],
      spatialReference: { wkid: 4326 },
    });

    // add the line to the map
    mapRef.current?.view.graphics.removeAll();
    mapRef.current?.view.graphics.add(
      new Graphic({
        geometry: line,
        symbol: { type: "simple-line", color: "blue", width: 3 },
      })
    );
  }
  const startOver = () => {
    mapRef.current?.view?.graphics.removeAll();
    coordinatesRef.current = [];
  };
  const { mapRef } = useMap();

  useEffect(() => {
    return () => {
      startOver();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Route Recorder</h1>
      <button onClick={startRecording}>Start Recording</button>
      <br />
      <button onClick={startOver}>Start Over</button>
    </div>
  );
}

export default RouteRecorder;
