import client from "../../lib/config/database.ts";
import { compare } from "bcrypt";

export const handler = async (req: Request): Promise<Response> => {
  try {
    if (req.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    const body = await req.json();
    const { username, password } = body;

    if (!username) {
      return new Response(JSON.stringify({ error: "Falta Username" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    if (!password) {
      return new Response(JSON.stringify({ error: "Falta Password" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const usernameExist = await client.queryObject`
      SELECT * FROM admin WHERE username = ${username}
    `;

    const user = usernameExist.rows[0];
    if (!user) {
      return new Response(
        JSON.stringify({ error: "Usuario o contraseña incorrectos" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const correctPassword = await compare(password, user.password);
    if (!correctPassword) {
      return new Response(
        JSON.stringify({ error: "Usuario o contraseña incorrectos" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    return new Response(
      JSON.stringify({
        message: "Login exitoso",
        user: {
          id: user.id.toString(),
          username: user.username,
        },
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Error en login:", error);
    return new Response(
      JSON.stringify({ error: "Error interno del servidor" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};
