// components/StudentForm.tsx
import { JSX } from "preact";

interface StudentFormProps {
  error?: string;
  onSubmit?: (e: JSX.TargetedEvent<HTMLFormElement>) => void;
}

export default function StudentForm({ error, onSubmit }: StudentFormProps) {
  return (
    <form onSubmit={onSubmit} class="space-y-4 p-6 bg-white rounded-md shadow-md max-w-xl mx-auto">
      <h2 class="text-2xl font-semibold mb-4 text-center">Agregar Alumno</h2>

      {error && <p class="text-red-500">{error}</p>}

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label for="firstName" class="block mb-2">Nombre:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            class="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label for="lastName" class="block mb-2">Apellido:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            class="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
      </div>

      <div>
        <label for="universityCareer" class="block mb-2">Carrera Universitaria:</label>
        <select
          id="universityCareer"
          name="universityCareer"
          class="w-full px-3 py-2 border rounded-md"
          required
        >
          <option value="">Seleccionar carrera</option>
          <option value="ingenieria">Ingeniería</option>
          <option value="medicina">Medicina</option>
          <option value="derecho">Derecho</option>
          <option value="arquitectura">Arquitectura</option>
          <option value="psicologia">Psicología</option>
        </select>
      </div>

      <div>
        <label for="email" class="block mb-2">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          class="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>

      <button
        type="submit"
        class="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Guardar Alumno
      </button>
    </form>
  );
}
