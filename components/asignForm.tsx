// asignForm.tsx
import { JSX } from "preact/jsx-runtime";
import { Signal } from "@preact/signals";

interface Student {
  id: number;
  name: string;
  lastName: string;
  age: number;
  email: string;
  legajo: number;
}

interface Career {
  id: number;
  name: string;
  studentPlan_id: number | null;
}

interface AssignFormProps {
  estudiantes: Signal<Student[]>;
  carreras: Signal<Career[]>;
  onSubmit: (e: JSX.TargetedEvent<HTMLFormElement>) => void;
}

export default function AssignForm({ estudiantes, carreras, onSubmit }: AssignFormProps) {
  return (
    <section>
      <form class="space-y-4 max-w-md" onSubmit={onSubmit}>
        <select class="w-full p-2 border rounded" name="student_id" required>
          <option disabled selected value="">
            Selecciona un estudiante
          </option>
          {estudiantes.value.map((e) => (
            <option key={e.id} value={e.id}>
              {e.name} {e.lastName}
            </option>
          ))}
        </select>

        <select class="w-full p-2 border rounded" name="carrer_id" required>
          <option disabled selected value="">
            Selecciona una carrera
          </option>
          {carreras.value.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <button class="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
          Asignar
        </button>
      </form>
    </section>
  );
}