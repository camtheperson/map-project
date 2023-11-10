import React from 'react';
import { Polyline, useMapEvents } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';

interface TrailConstructorProps {
    onMapClick: (e: L.LeafletMouseEvent) => void;
    trailSets?: LatLngExpression[][];
}

const TrailConstructor: React.FC<TrailConstructorProps> = ({ onMapClick, trailSets }) => {
    useMapEvents({ click: onMapClick });

    return (
        <>
            {trailSets && trailSets.length > 0 && trailSets.map((trail, index) => (
                <Polyline key={index} pathOptions={{ color: "red" }} positions={trail} />
            ))}
        </>
    );
}

export default TrailConstructor;
