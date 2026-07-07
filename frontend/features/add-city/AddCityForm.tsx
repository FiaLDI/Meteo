"use client";

import { useCityStore } from "@/entities/city/model/store";
import { useState } from "react";

export default function AddCityForm() {

    const add = useCityStore(s => s.add);

    const [name, setName] = useState("");
    const [lat, setLat] = useState("");
    const [lon, setLon] = useState("");

    return (
        <div className="border p-3">
            <h2>Add custom city from</h2>
                <form
                    onSubmit={async e => {
                        e.preventDefault();

                        await add({
                            name,
                            latitude: Number(lat),
                            longitude: Number(lon)
                        });

                        setName("");
                        setLat("");
                        setLon("");
                    }}
                        className="flex gap-2"
                >

                    <input
                        placeholder="City"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="border p-1"
                    />
                    <input
                        placeholder="Latitude"
                        value={lat}
                        onChange={e => setLat(e.target.value)}
                        className="border p-1"
                    />
                    <input
                        placeholder="Longitude"
                        value={lon}
                        onChange={e => setLon(e.target.value)}
                        className="border p-1"
                    />
                    <button>Add</button>

                </form>
            </div>
    );

}
