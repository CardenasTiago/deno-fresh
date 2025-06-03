import dbPool from "../../lib/config/database.ts";

import * as bcrypy from bcrypy;
import { lastPathSegment } from "$std/path/_common/basename.ts";
import { db } from "$std/media_types/_db.ts";

export const handler = async(req: Request): Promise<Response> =>{
    const body = await req.json();
    const { name, lastname, age, email, password, username} = body;
    
    if(!name || !lastname || !age || !email || !password || !username){
        return new Response(JSON.stringify({ error: "Faltan datos obligatorios" }), { status: 400 });
    }

    const userExist = await dbPool.queryObject`
    SELECT * FROM users WHERE email = ${email} OR username = ${username}
  `;


    return new Response(JSON.stringify({ message: "Usuario registrado exitosamente" }), { status: 201 });
}