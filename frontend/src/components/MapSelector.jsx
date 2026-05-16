import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function LocationMarker({ position, setPosition }) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  return position ? <Marker position={position} icon={markerIcon} /> : null;
}

function Recenter({ center, zoom }) {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);

  return null;
}

export default function MapSelector({ position, onSelect }) {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (!position && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (geo) => {
          setUserLocation({ lat: geo.coords.latitude, lng: geo.coords.longitude });
        },
        () => {
          // Ignore geolocation failures and keep fallback center.
        },
        { enableHighAccuracy: true, maximumAge: 60000, timeout: 10000 }
      );
    }
  }, [position]);

  const center = position
    ? [position.lat, position.lng]
    : userLocation
      ? [userLocation.lat, userLocation.lng]
      : [0, 0];
  const zoom = position || userLocation ? 13 : 2;

  return (
    <div className="map-selector" style={{ width: '100%', height: '320px', marginTop: '1rem' }}>
      <MapContainer center={center} zoom={zoom} scrollWheelZoom style={{ width: '100%', height: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Recenter center={center} zoom={zoom} />
        <LocationMarker position={position} setPosition={onSelect} />
      </MapContainer>
    </div>
  );
}
