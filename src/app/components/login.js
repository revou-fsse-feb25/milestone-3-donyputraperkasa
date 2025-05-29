'use client'
import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch('https://api.escuelajs.co/api/v1/auth/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error("Login gagal");
            }

            const data = await response.json();
            console.log("data", data);
            localStorage.setItem("access_token", data.access_token);
            alert("Login berhasil!");
        } catch (err) {
            setError(err.message);
            console.log(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <label htmlFor="email">Email</label>
                <input 
                    id="email"
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="masukan email"
                    className="border rounded-md"
                />
                <label htmlFor="password">Password</label>
                <input 
                    id="password"
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="masukan password"
                    className="border rounded-md"
                />
                <button 
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Login"}
                </button>
                {error && <p className="text-red-500">{error}</p>}
            </form>
            <div className="flex flex-col items-center m-3">
                <p>email : john@mail.com</p>
                <p>password : changeme</p>
            </div>
        </div>  
    )
}