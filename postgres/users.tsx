import { pool } from "@/postgres/pool"

export async function allUsers() {
  return pool.query("SELECT * FROM public.user")
}
