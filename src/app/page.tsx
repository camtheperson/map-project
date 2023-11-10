'use client'
import { MapComponent } from './components/MapComponent'

export default function Home() {
    return (
        <main className="p-24">
            <h1 className="text-3xl font-bold mb-5">Cam's Trails</h1>
            <MapComponent />
        </main>
    )
}
