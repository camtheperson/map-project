import React from 'react';

interface YourLocationTextProps {
    latitude: number;
    longitude: number;
}

const YourLocationText: React.FC<YourLocationTextProps> = ({latitude, longitude}) => {
    return (
        <>
            <p className="font-bold">Your current location:</p>
            <p>Latitude: {latitude}</p>
            <p>Longitude: {longitude}</p>
        </>
    );
}

export default YourLocationText