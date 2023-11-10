import {LatLngTuple} from 'leaflet';
  
const toRadians = (degrees: number) => {
    return degrees * Math.PI / 180;
}

export const calculateDistanceInMeters = (coords: LatLngTuple[]): number => {
    if (coords.length < 2) {
        throw new Error("At least two coordinates are required");
    }
  
    let totalDistance = 0;
  
    for (let i = 0; i < coords.length - 1; i++) {
        const [lat1, lon1] = coords[i];
        const [lat2, lon2] = coords[i + 1];

        const R = 6371e3; // meters
        const φ1 = toRadians(lat1);
        const φ2 = toRadians(lat2);
        const Δφ = toRadians(lat2 - lat1);
        const Δλ = toRadians(lon2 - lon1);

        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const distance = R * c; // in meters
        totalDistance += distance;
    }
  
    return totalDistance;
  }
  