import { allUsers, saveUser } from "../../../database/repositories/user-repository"

export async function GET(request) {
  const response = await allUsers()
  return new Response(JSON.stringify(response), {
    status: 200
  });
}

export async function POST(request) {
  await saveUser()
  const response = { message: "post success!" }
  return new Response(JSON.stringify(response), {
    status: 200
  });
}