// islands/RegisterForm.tsx
import { useState } from "preact/hooks";
import RegisterFormC from "../components/registerFormC.tsx";
import { JSX } from "preact/jsx-runtime";

export default function RegisterFormIsland() {
  const [error, setError] = useState<string>("");
    // islands/RegisterForm.tsx
    const handleSubmit = async (e: JSX.TargetedEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
    
        try {
        const res = await fetch("api/register", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "Accept": "application/json" 
            },
            body: JSON.stringify({
            username: formData.get("username"),
            password: formData.get("password"),
            }),
            credentials: "include" 
        });
    
        if (!res.ok) throw new Error(await res.text());
        window.location.href = "/login?registered=true";
        } catch (err) {
        setError(err.message.includes("JSON parse error") 
            ? "Formato de datos inválido" 
            : err.message);
        }
    };

  return <RegisterFormC error={error} onSubmit={handleSubmit} />;
}