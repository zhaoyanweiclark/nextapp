import { allUsers } from "@/postgres/users"

export const dynamic = 'force-dynamic'

export async function GET() {
  const users = await allUsers()
  const response = {
    data: users.rows,
    message: "success",
  }
  return new Response(JSON.stringify(response), {
    status: 200
  })
}