import dynamic from 'next/dynamic';

export const MapComponent = dynamic(() => import('./MapComponent'), {
    ssr: false,
});