import { useState, useEffect } from 'react';

interface LocationState {
    latitude: number;
    longitude: number;
}

const useCurrentLocation = (): [LocationState, string | null] => {
    const [location, setLocation] = useState<LocationState>({ latitude: 0, longitude: 0 });
    const [error, setError] = useState<string | null>(null);

    const handleSuccess = (position: GeolocationPosition) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
    };

    const handleError = (error: GeolocationPositionError) => {
        setError(error.message);
    };

    useEffect(() => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser.');
            return;
        }

        navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
    }, []);

    return [location, error];
};

export default useCurrentLocation;
