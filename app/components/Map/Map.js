'use client';

import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';

export default function Map() {
  return (
    <MapContainer
      center={[48.208492, 16.373755]}
      zoom={100}
      scrollWheelZoom={false}
      style={{ width: '100%', height: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={{ lat: 48.208492, lng: 16.373755 }}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}

// 'use client';

// import 'leaflet/dist/leaflet.css';
// import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
// import 'leaflet-defaulticon-compatibility';
// import { Marker, Popup } from 'react-leaflet';
// import { MapContainer } from 'react-leaflet/MapContainer';
// import { TileLayer } from 'react-leaflet/TileLayer';
// import { getLocationWithSpecializations } from '../../../utils/dataStructure';

// export default function Map(props) {
//   // centering the map
//   const position = [48.208492, 16.373755];
//   const location = getLocationWithSpecializations(singleLocation);

//   return (
//     <MapContainer
//       center={position}
//       zoom={11}
//       scrollWheelZoom={true}
//       // whenCreated={setMap}
//       animate={true}
//     >
//       <TileLayer
//         attribution='&copy; <a href="http://www.openstreetmap.org/copyright"'
//         url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       {props.locations.map((singleLocation) => (
//         <Marker
//           key={`location-${singleLocation.locationId}`}
//           position={{
//             lat: singleLocation.locationLatCoord,
//             lng: singleLocation.locationLongCoord,
//           }}
//         >
//           <Popup>
//             {singleLocation.locationName}

//             <br />
//             {singleLocation.street}
//             <br />
//           </Popup>
//         </Marker>
//       ))}
//     </MapContainer>
//   );
// }
