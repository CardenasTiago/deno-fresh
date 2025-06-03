// db_test.ts
import { assertExists } from "https://deno.land/std@0.224.0/assert/assert_exists.ts";
import client from "./database.ts";

Deno.test("Conexión a la base de datos Postgres", async () => {
  const result = await client.queryObject`SELECT NOW()`;
  console.log(result.rows);
  assertExists(result.rows[0], "No se obtuvo la fecha de la base de datos");
});
