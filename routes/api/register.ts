import client from "../../lib/config/database.ts";
import {hash} from "bcrypt";


export const handler = async(req: Request): Promise<Response> =>{
    const body = await req.json();
    const { name, lastname, age, email, password, username} = body;
    
    if(!name || !lastname || !age || !email || !password || !username){
        return new Response(JSON.stringify({ error: "Faltan datos obligatorios" }), { status: 400 });
    }

    const userEmail = await client.queryObject`
    SELECT * FROM app_user WHERE email = ${email}
  `;

    if(userEmail.rows.length > 0){
        return new Response(JSON.stringify({error: "Usuario con ese email ya existe"}),{ status: 400})
    }

    const userName = await client.queryObject`
    SELECT * FROM app_user WHERE username = ${username}
    `;

    if(userName.rows.length > 0){
        return new Response(JSON.stringify({error: "Usuario con ese username ya existe"}), {status: 400});
    }

    const hashedPassword = await hash(password);


    await client.queryObject`
    INSERT INTO app_user (name, lastname, age, email, password, username)
    VALUES (${name}, ${lastname}, ${age}, ${email}, ${hashedPassword}, ${username})
    `;

    return new Response(JSON.stringify({ message: "Usuario registrado exitosamente" }), { status: 201 });
}