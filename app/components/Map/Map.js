'use client';

import 'leaflet/dist/leaflet';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import styles from './Map.module.scss';

export default function Map() {
  return (
    <div>
      <MapContainer
        className={styles.map}
        center={[51.505, -0.09]}
        zoom={100}
        scrollWheelZoom={false}
        style={{ width: '20%', height: '20%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
