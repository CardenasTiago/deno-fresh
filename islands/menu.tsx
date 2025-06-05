// islands/Dashboard.tsx
import { useState } from "preact/hooks";
import StudentForm from "../components/studentForm.tsx";
import { JSX } from "preact/jsx-runtime";
import CarrerForm from "../components/carrerForm.tsx";
import { useEffect } from "preact/hooks";
import { signal } from "@preact/signals";


export default function Dashboard() {
  const [section, setSection] = useState("estudiante");
  const estudiantes = signal([]);
  const carreras = signal([]);


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
                <StudentForm onSubmit={handleStudentSubmit} />
          </section>
        )}

        {section === "carrera" && (
          <section>
            <h3 class="text-2xl font-semibold mb-4">Agregar Carrera</h3>
            <CarrerForm onSubmit={handleCarrerSubmit}/>
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

async function handleStudentSubmit(e: JSX.TargetedEvent<HTMLFormElement>) {
  e.preventDefault();
  const form = new FormData(e.currentTarget);
  const data = {
    name: form.get("name"),
    lastName: form.get("lastname"),
    email: form.get("email"),
    age: form.get("age"),
    legajo: form.get("legajo")
  };

  const res = await fetch("http://localhost:8080/students", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });

  if (res.ok) {
    alert("Estudiante guardado");
    e.currentTarget.reset();
  } else {
    alert("Error al guardar estudiante");
  }
}

async function handleCarrerSubmit(e: JSX.TargetedEvent<HTMLFormElement>){
  e.preventDefault();
  const form = new FormData(e.currentTarget);
  const data = {
    name: form.get("name"),
  };

  const res = await fetch("http://localhost:8080/carrers",{
    method: "POST",
    body: JSON.stringify(data),
    headers:{"Content-Type": "application/json"},
  });

  if (res.ok){
    alert("Carrera guardada");
    e.currentTarget.reset();
  }else{
    alert("Error al guardar la carera");
  }
}

