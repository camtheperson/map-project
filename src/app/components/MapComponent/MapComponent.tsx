import React, {useState} from 'react';
import { 
    MapContainer,
    Marker,
    Polyline,
    TileLayer,
} from 'react-leaflet';
import {LatLngTuple} from 'leaflet';

import YourLocationText from '../YourLocationText';
import TrailConstructor from '../TrailConstructor';

import useCurrentLocation from '@/app/hooks/useCurrentLocation';

const Map: React.FC = () => {
    // General error handling
    const [error, setError] = useState<string | null>(null);

    // Check if current location data is available
    const [location, locationError] = useCurrentLocation();
    const isLocationAvailable = location && location.latitude != 0 && location.longitude != 0;

    // Used to add new points to a particular trail.
    const [trailPoints, setTrailPoints] = useState<LatLngTuple[] | null>(null);
    const mapClickHandler = (e: L.LeafletMouseEvent) => {
        const newPoint: LatLngTuple = [e.latlng.lat, e.latlng.lng];
        setTrailPoints(trailPoints => [...(trailPoints || []), newPoint]);
        console.log({trailPoints});
    }

    // Adds a new trail and resets trailPoints
    const [trailSets, setTrailSets] = useState<LatLngTuple[][] | null>(null);
    const handleAddTrail = (e: React.SyntheticEvent) => {
        e.preventDefault();
        console.log("Adding trail.");

        setError(null);

        // Error handling
        if (!trailPoints || trailPoints.length < 2) {
            setError("Must have more than a single point to create a trail")
        }

        // Add current trail to trailSets
        setTrailSets(trailSets => {
            if (trailPoints && trailPoints.length > 0) {
                // Append new trailPoints to existing trailSets
                return trailSets ? [...trailSets, trailPoints] : [trailPoints];
            }
            return trailSets;
        });

        // Reset trailPoints
        setTrailPoints([]);
    }

    // Render the map only when location is available
    return (
        <div className="h-[500px] w-[100%]" id="map">
            {isLocationAvailable ? (
                <>
                    <YourLocationText latitude={location.latitude} longitude={location.longitude} />
                    <MapContainer 
                        className='my-5 h-full w-full' 
                        center={[location.latitude, location.longitude]} 
                        zoom={15}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <TrailConstructor onMapClick={mapClickHandler} />
                        {trailPoints && trailPoints.length > 0 && (
                            <Polyline pathOptions={{color: "red"}} positions={trailPoints} />    
                        )}
                        {trailSets && trailSets.length > 0 && trailSets.map((trail, index) => (
                            <Polyline key={index} pathOptions={{ color: "red" }} positions={trail} />
                        ))}
                        <Marker position={[location.latitude, location.longitude]} />
                    </MapContainer>
                    <form onSubmit={handleAddTrail} className="mb-4">
                        <button className="bg-slate-300 p-4 font-bold text-base">Add trail</button>
                        {error && (
                            <p>Error: {error}</p>
                        )}
                    </form>
                </>
            ) : locationError ? (
                <div>Error loading map: {locationError}</div>
            ) : (
                <div>Detecting current location...</div>
            )}
        </div>
    );
};

export default Map;
