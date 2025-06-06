import { JSX } from "preact";

interface StudentFormProps {
  error?: string;
  onSubmit?: (e: JSX.TargetedEvent<HTMLFormElement>) => void;
}

export default function StudentForm({ error, onSubmit }: StudentFormProps) {
  return (
    <form onSubmit={onSubmit} class="space-y-4 max-w-xl">
      {error && <p class="text-red-500">{error}</p>}

      <div class="grid grid-cols-2 gap-4">
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Nombre"
          class="p-2 border rounded w-full"
          required
        />
        <input
          type="text"
          id="lastname"
          name="lastname"
          placeholder="Apellido"
          class="p-2 border rounded w-full"
          required
        />
      </div>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Email"
        class="w-full p-2 border rounded"
        required
      />

      <div class="grid grid-cols-2 gap-4">
        <input
          type="number"
          id="age"
          name="age"
          placeholder="Edad"
          class="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          id="legajo"
          name="legajo"
          placeholder="Legajo"
          class="p-2 border rounded w-full"
          required
        />
      </div>

      <button
        type="submit"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Guardar Estudiante
      </button>
    </form>
  );
}
