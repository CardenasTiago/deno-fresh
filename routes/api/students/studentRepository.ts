import dbPool from "../config/database.ts";
import { Student } from "./student.ts";

export const StudentRepository = {
    
    async create(student: Omit<Student, "id">): Promise<Student> {
        const client = await dbPool.connect();
        try {
            const result = await client.queryObject<Student>(
                {
                  text: `INSERT INTO students (nombre, apellido, edad, email, password, username)
                         VALUES ($1, $2, $3, $4, $5, $6)
                         RETURNING *`,
                  args: [
                    student.nombre,
                    student.apellido,
                    student.edad,
                    student.email,
                    student.password,
                    student.username,
                  ],
                }
              );
              
          return result.rows[0];
        } finally {
          client.release();
        }
      },
}