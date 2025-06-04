
import client from "../../lib/config/database.ts";
import {compare} from "bcrypt";

export const handler = async(req: Request): Promise<Response> =>{
    const body = await req.json();
    const{ username, password} = body;

    if(!username){
        return new Response(JSON.stringify({ error: "Falta Username"}), { status: 400})
    }
    if(!password){
        return new Response(JSON.stringify({ error: "Falta Password"}), { status: 400})
    }

    const usernameExist = await client.queryObject`
    SELECT * FROM app_user WHERE username = ${username}
    `;

    const user = usernameExist.rows[0]
    if(!user){
        return new Response(JSON.stringify({ error: "Usuario no encontrado"}), { status: 400})
    }

    const correctPassword = await compare(password, user.password);
    if(!correctPassword){
        return new Response(JSON.stringify({ error: "Password incorrecta"}), { status: 400})       
    }

    return new Response(JSON.stringify({
    message: "Login exitoso",
    user: {
      id: user.id.toString(),
      name: user.name,
      username: user.username,
      email: user.email,
    },
  }), { status: 200 });
};
