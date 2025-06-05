// islands/Dashboard.tsx
import { useState } from "preact/hooks";
import StudentForm from "../components/studentForm.tsx";
import { JSX } from "preact/jsx-runtime";
import CarrerForm from "../components/carrerForm.tsx";
import { useEffect } from "preact/hooks";
import { signal } from "@preact/signals";
import AssignForm from "../components/asignForm.tsx";

// Declara los signals fuera del componente
const estudiantes = signal([]);
const carreras = signal([]);

export default function Menu() {
  const [section, setSection] = useState("estudiante");
  
  useEffect(() => {
    async function fetchData() {
      try {
        const resEstudiantes = await fetch("http://localhost:8080/students");
        const resCarreras = await fetch("http://localhost:8080/carrers");
  
        console.log("res estudiantes", resEstudiantes);
        console.log("res carreras", resCarreras);

        if (!resEstudiantes.ok || !resCarreras.ok) {
          throw new Error("Error al cargar datos");
        }
  
        const dataEstudiantes = await resEstudiantes.json();
        const dataCarreras = await resCarreras.json();
        console.log("datos estudiantes", dataEstudiantes);
        console.log("datos carreras", dataCarreras);

        estudiantes.value = dataEstudiantes;
        carreras.value = dataCarreras;
        //debug
        console.log("datos estudiantes", estudiantes.value);
        console.log("datos carreras", carreras.value);
      } catch (error) {
        console.error("Error al cargar estudiantes o carreras:", error);
      }
    }
  
    fetchData();
  }, []);

  // Función para refrescar los datos
  const refreshData = async () => {
    try {
      const resEstudiantes = await fetch("http://localhost:8080/students");
      const resCarreras = await fetch("http://localhost:8080/carrers");

      if (resEstudiantes.ok) {
        const dataEstudiantes = await resEstudiantes.json();
        estudiantes.value = dataEstudiantes;
      }

      if (resCarreras.ok) {
        const dataCarreras = await resCarreras.json();
        carreras.value = dataCarreras;
      }
    } catch (error) {
      console.error("Error al actualizar datos:", error);
    }
  };
  
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
            <StudentForm onSubmit={(e) => handleStudentSubmit(e, refreshData)} />
          </section>
        )}

        {section === "carrera" && (
          <section>
            <h3 class="text-2xl font-semibold mb-4">Agregar Carrera</h3>
            <CarrerForm onSubmit={(e) => handleCarrerSubmit(e, refreshData)}/>
          </section>
        )}

        {section === "asignar" && (
          <section>
            <h3 class="text-2xl font-semibold mb-4">Asignar Carrera a Estudiante</h3>
            <AssignForm
              estudiantes={estudiantes}
              carreras={carreras}
              onSubmit={handleAssignSubmit}
            />
          </section>
        )}
      </main>
    </div>
  );
}

async function handleStudentSubmit(e: JSX.TargetedEvent<HTMLFormElement>, refreshData?: () => Promise<void>) {
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
    // Actualizar los datos después de agregar
    if (refreshData) await refreshData();
  } else {
    alert("Error al guardar estudiante");
  }
}

async function handleCarrerSubmit(e: JSX.TargetedEvent<HTMLFormElement>, refreshData?: () => Promise<void>) {
  e.preventDefault();
  const form = new FormData(e.currentTarget);
  const data = {
    name: form.get("name"),
  };

  const res = await fetch("http://localhost:8080/carrers", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {"Content-Type": "application/json"},
  });

  if (res.ok) {
    alert("Carrera guardada");
    e.currentTarget.reset();
    // Actualizar los datos después de agregar
    if (refreshData) await refreshData();
  } else {
    alert("Error al guardar la carrera");
  }
}

async function handleAssignSubmit(e: JSX.TargetedEvent<HTMLFormElement>) {
  e.preventDefault();
  const form = new FormData(e.currentTarget);
  const data = {
    studentId: form.get("student_id"),
    carrerId: form.get("carrer_id")
  };

  const res = await fetch("http://localhost:8080/students/enroll", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {"Content-Type": "application/json"},
  });

  if (res.ok) {
    alert("Carrera asignada correctamente");
    e.currentTarget.reset();
  } else {
    alert("Error al asignar la carrera");
  }
}