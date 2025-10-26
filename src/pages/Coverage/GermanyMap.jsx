import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';

// Fix default marker issue in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Example coordinates of major German cities
// const cities = [
//   { name: 'Berlin', coords: [52.52, 13.405] },
//   { name: 'Hamburg', coords: [53.551, 9.993] },
//   { name: 'Munich', coords: [48.135, 11.582] },
//   { name: 'Cologne', coords: [50.9375, 6.9603] },
//   { name: 'Frankfurt', coords: [50.1109, 8.6821] },
// ];

// Small helper component to control map position dynamically
const MapController = ({ coords }) => {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.flyTo(coords, 10, { duration: 1.5 });
    }
  }, [coords, map]);
  return null;
};

const GermanyMap = ({ serviceCenters, selectedCity }) => {
  // Find matching city (case-insensitive, partial match)
  // Only search if user typed something
  const matchedCity =
    selectedCity.trim() !== ''
      ? serviceCenters.find(center =>
          center.city.toLowerCase().includes(selectedCity.toLowerCase())
        )
      : null;

  return (
    <>
      {/* Map Section */}
      <div className="mx-auto w-full md:w-4/5 lg:w-3/4 h-[550px] rounded-xl overflow-hidden shadow-lg">
        <MapContainer
          center={[51.1657, 10.4515]} // Center of Germany
          zoom={6}
          scrollWheelZoom={true}
          className="h-full w-full z-0"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* City Markers */}
          {serviceCenters.map((center, index) => (
            <Marker
              key={index}
              position={[center.latitude, center.longitude]}
              icon={new L.Icon.Default()}
            >
              <Popup>
                {/* <span className="font-semibold">{city.name}</span> */}
                <h3 className="text-lg font-bold">{center.city}</h3>
                <p>Region: {center.region}</p>
                <p>Covered Areas: {center.covered_area.join(', ')}</p>
                <a
                  href={center.flowchart}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Flowchart
                </a>
              </Popup>
            </Marker>
          ))}
          {/* If a city was found, update the map view */}
          {matchedCity && (
            <MapController
              coords={[matchedCity.latitude, matchedCity.longitude]}
            />
          )}
        </MapContainer>
      </div>
    </>
  );
};
export default GermanyMap;
