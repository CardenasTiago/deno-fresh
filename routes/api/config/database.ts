import { Pool } from "postgres/mod.ts";

const POOL_CONNECTIONS = 3;

const dbPool = new Pool({
  user: "postgres",
  password: "password",
  database: "deno_db",
  hostname: "localhost",
  port: 5432,
}, POOL_CONNECTIONS, true);

export default dbPool;