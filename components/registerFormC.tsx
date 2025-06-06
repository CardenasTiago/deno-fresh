import { JSX } from "preact";

interface RegisterFormProps {
  error?: string;
  onSubmit?: (e: JSX.TargetedEvent<HTMLFormElement>) => void;
}

export default function RegisterForm({ error, onSubmit }: RegisterFormProps) {
  return (
    <form onSubmit={onSubmit} class="space-y-4">
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
          type="password"
          id="password"
          name="password"
          class="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>

      <button
        type="submit"
        class="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
      >
        Registrarse
      </button>
    </form>
  );
}