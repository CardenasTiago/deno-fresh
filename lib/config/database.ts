import { Client } from "postgres/mod.ts";

const client = new Client({
  user: "postgres",
  password: "password",
  database: "studentapp",
  hostname: "localhost",
  port: 5432,
});

await client.connect();

export default client;