// routes/register.tsx
import { Head } from "$fresh/runtime.ts";
import RegisterForm from "../islands/registerForm.tsx";

export default function RegisterPage() {
  return (
    <>
      <Head>
        <title>Registro</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <h1 class="text-2xl font-bold mb-4">Crear cuenta</h1>
        <RegisterForm />
        <p class="mt-4">
          ¿Ya tienes cuenta? <a href="/login" class="text-blue-500">Inicia sesión</a>.
        </p>
      </div>
    </>
  );
}