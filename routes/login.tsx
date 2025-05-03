// routes/login.tsx
import { Head } from "$fresh/runtime.ts";
import LoginForm from "../islands/loginForm.tsx";

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <h1 class="text-2xl font-bold mb-4">Iniciar sesión</h1>
        <LoginForm />
      </div>
    </>
  );
}