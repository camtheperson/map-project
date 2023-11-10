import React, { useState } from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

const LocationMarker: React.FC = () => {
    const [position, setPosition] = useState<L.LatLng | null>(null);

    const map = useMapEvents({
        click() {
            map.locate();
        },
        locationfound(e) {
            map.locate();
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
            map.on('click', (e) => console.log('map was clicked', e.latlng));
        },
    });

    return position === null ? null : (
        <Marker position={position}>
            <Popup>You are here</Popup>
        </Marker>
    );
}

export default LocationMarker;
