// components/AuthForm.tsx
import { JSX } from "preact";

interface AuthFormProps {
  error?: string;
  onSubmit?: (e: JSX.TargetedEvent<HTMLFormElement>) => void;
}

export default function AuthForm({ error, onSubmit }: AuthFormProps) {
  return (
    <form onSubmit={onSubmit} class="space-y-4"> {/* ¡Ahora es un <form>! */}
      {error && <p class="text-red-500">{error}</p>}
      <div>
        <label for="username" class="block mb-2">Usuario:</label>
        <input
          type="text"
          id="username"
          name="username"
          class="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>
      <div>
        <label for="password" class="block mb-2">Contraseña:</label>
        <input
          type="text"
          id="password"
          name="password"
          class="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>
      <button
        type="submit"
        class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Entrar
      </button>
    </form>
  );
}