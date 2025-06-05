import { JSX } from "preact";

interface CarrerFormPromps{
    error?: String;
    onSubmit?:(e: JSX.TargetedEvent<HTMLFormElement>) => void;   
}

export default function CarrerForm({error, onSubmit}:CarrerFormPromps){
    return(
        <form onSubmit={onSubmit} class="space-y-4 max-w-md">
        <input type="text" id="name" name="name" placeholder="Nombre de la carrera" class="w-full p-2 border rounded" />
        <button class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Guardar Carrera
        </button>
      </form>
    )

}