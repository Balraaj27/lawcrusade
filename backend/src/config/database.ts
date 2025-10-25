import { Pool } from 'pg';
import dotenv from "dotenv";
dotenv.config(); // ✅ This ensures DATABASE_URL is available

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // ✅ Required for Neon
});

export const query = async (text: string, params?: any[]) => {
  try {
    const res = await pool.query(text, params);
    return res;
  } catch (error) {
    console.error('Database query error', { text, error });
    throw error;
  }
};

export const getClient = () => pool.connect();

export default pool;
