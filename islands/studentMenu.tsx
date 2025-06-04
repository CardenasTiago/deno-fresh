// islands/Dashboard.tsx
import { useState } from "preact/hooks";

export default function Dashboard() {
  const [section, setSection] = useState("estudiante");

  return (
    <div class="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside class="w-64 bg-white p-6 border-r shadow-md">
        <h2 class="text-2xl font-bold mb-6 text-center">Panel</h2>
        <nav class="space-y-4">
          <button
            class={`w-full text-left px-4 py-2 rounded-md ${
              section === "estudiante" ? "bg-blue-500 text-white" : "hover:bg-gray-200"
            }`}
            onClick={() => setSection("estudiante")}
          >
            ➕ Agregar Estudiante
          </button>
          <button
            class={`w-full text-left px-4 py-2 rounded-md ${
              section === "carrera" ? "bg-blue-500 text-white" : "hover:bg-gray-200"
            }`}
            onClick={() => setSection("carrera")}
          >
            🎓 Agregar Carrera
          </button>
          <button
            class={`w-full text-left px-4 py-2 rounded-md ${
              section === "asignar" ? "bg-blue-500 text-white" : "hover:bg-gray-200"
            }`}
            onClick={() => setSection("asignar")}
          >
            🔗 Asignar Carrera
          </button>
        </nav>
      </aside>

      {/* Content */}
      <main class="flex-1 p-10">
        {section === "estudiante" && (
          <section>
            <h3 class="text-2xl font-semibold mb-4">Agregar Estudiante</h3>
            <form class="space-y-4 max-w-xl">
              <div class="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Nombre" class="p-2 border rounded" />
                <input type="text" placeholder="Apellido" class="p-2 border rounded" />
              </div>
              <input type="number" placeholder="Edad" class="w-full p-2 border rounded" />
              <input type="email" placeholder="Email" class="w-full p-2 border rounded" />
              <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Guardar Estudiante
              </button>
            </form>
          </section>
        )}

        {section === "carrera" && (
          <section>
            <h3 class="text-2xl font-semibold mb-4">Agregar Carrera</h3>
            <form class="space-y-4 max-w-md">
              <input type="text" placeholder="Nombre de la carrera" class="w-full p-2 border rounded" />
              <button class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                Guardar Carrera
              </button>
            </form>
          </section>
        )}

        {section === "asignar" && (
          <section>
            <h3 class="text-2xl font-semibold mb-4">Asignar Carrera a Estudiante</h3>
            <form class="space-y-4 max-w-md">
              <select class="w-full p-2 border rounded">
                <option disabled selected>Selecciona un estudiante</option>
                {/* Opciones dinámicas en el futuro */}
              </select>
              <select class="w-full p-2 border rounded">
                <option disabled selected>Selecciona una carrera</option>
                {/* Opciones dinámicas en el futuro */}
              </select>
              <button class="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
                Asignar
              </button>
            </form>
          </section>
        )}
      </main>
    </div>
  );
}
