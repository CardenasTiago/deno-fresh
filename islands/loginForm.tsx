// islands/LoginForm.tsx
import { useState } from "preact/hooks";
import AuthForm from "../components/authForm.tsx";
import { JSX } from "preact/jsx-runtime";

export default function LoginForm() {
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: JSX.TargetedEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username")?.toString();
    const password = formData.get("password")?.toString();

    try {
      const res = await fetch("http://localhost:8080/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include", // ¡Importante para enviar cookies!
      });

      if (!res.ok) throw new Error("Credenciales incorrectas");

      const { token } = await res.json();
      
      // Guardar token en cookie y redirigir
      document.cookie = `authToken=${token}; path=/; SameSite=Lax`;
      window.location.href = "/bienvenido";
    } catch (err) {
      setError(err.message);
    }
  };

  return <AuthForm error={error} onSubmit={handleSubmit} />;
}