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
      const res = await fetch("api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      if (!res.ok) throw new Error("Credenciales incorrectas");

      const { token } = await res.json();
      
      document.cookie = `authToken=${token}; path=/; SameSite=Lax`;
      window.location.href = "/menu";
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocurrió un error inesperado");
      }
    }
  };

  return <AuthForm error={error} onSubmit={handleSubmit} />;
}
