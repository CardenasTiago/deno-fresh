import client from "../../lib/config/database.ts";
import {hash} from "bcrypt";


export const handler = async(req: Request): Promise<Response> =>{
    const body = await req.json();
    const { username, password} = body;
    
    if(!username || !password ){
        return new Response(JSON.stringify({ error: "Faltan datos obligatorios" }), { status: 400 });
    }

    const userName = await client.queryObject`
    SELECT * FROM admin WHERE username = ${username}
    `;

    if(userName.rows.length > 0){
        return new Response(JSON.stringify({error: "Usuario con ese username ya existe"}), {status: 400});
    }

    const hashedPassword = await hash(password);


    await client.queryObject`
    INSERT INTO admin ( username,password)
    VALUES (${username}, ${hashedPassword})
    `;

    return new Response(JSON.stringify({ message: "Usuario registrado exitosamente" }), { status: 201 });
}