// components/InscriptionForm.tsx
"use client";
import { useState } from "react";

export default function InscriptionForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch("/api/inscription", {
            method: "POST",
            body: JSON.stringify({ name, email }),
            headers: { "Content-Type": "application/json" },
        });

        if (res.ok) {
            alert("Inscripción exitosa!");
        } else {
            alert("Error en la inscripción.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white shadow-lg rounded-md">
            <input
                type="text" placeholder="Nombre"
                value={name} onChange={(e) => setName(e.target.value)}
                className="border p-2 w-full"
            />
            <input
                type="email" placeholder="Email"
                value={email} onChange={(e) => setEmail(e.target.value)}
                className="border p-2 w-full mt-2"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 mt-2">
                Inscribirme
            </button>
        </form>
    );
}
