import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import getCenter from "geolib/es/getCenter";

function Map({ searchResults }) {
  const [selectedLocation, setSelectedLocation] = useState({});

  const coordinates = searchResults.map(({ long, lat }) => ({
    longitude: long,
    latitude: lat,
  }));

  const center = getCenter(coordinates);

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  });

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/xodeeq/cks0id66e1bj517p7q2x0u0qc"
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      {searchResults.map(({ lat, long, title }) => (
        <div key={long}>
          <Marker longitude={long} latitude={lat} offsetTop={-10}>
            <p
              role="img"
              onClick={() => setSelectedLocation({ lat, long })}
              className="cursor-pointer text-2xl animate-bounce"
              aria-label="push-pin"
            >
              📍
            </p>
          </Marker>

          {/* Poppup on makers */}
          {selectedLocation.long === long && (
            <Popup
              onClose={() => setSelectedLocation({})}
              closeOnClick={true}
              latitude={lat}
              longitude={long}
            >
              {title}
            </Popup>
          )}
        </div>
      ))}
    </ReactMapGL>
  );
}

export default Map;
