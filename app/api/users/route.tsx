import { allUsers, saveUser, updateUser, deleteUser } from "@/database/repositories/user-repository"

export const dynamic = 'force-dynamic'

export async function GET() {
  const response = await allUsers()
  return new Response(JSON.stringify(response), {
    status: 200
  })
}

export async function POST() {
  await saveUser()
  const response = { message: "post success!" }
  return new Response(JSON.stringify(response), {
    status: 200
  })
}

export async function PUT(req: Request) {
  const body = await req.json()
  if (!body.id) {
    const err = { message: `Invalid body data 'id'` }
    return new Response(JSON.stringify(err), {
      status: 400
    })
  }
  try {
    await updateUser(body.id)
  } catch (error: any) {
    const err = { message: error.message }
    return new Response(JSON.stringify(err), {
      status: 400
    })
  }
  const response = { message: "put success!" }
  return new Response(JSON.stringify(response), {
    status: 200
  })
}

export async function DELETE(req: Request) {
  const url = new URL(req.url)
  const idQuery = url.searchParams.get('id') || ""
  if (!idQuery) {
    const err = { message: `Invalid query parameter 'id'` }
    return new Response(JSON.stringify(err), {
      status: 400
    })
  }
  try {
    await deleteUser(Number.parseInt(idQuery, 10))
  } catch (error: any) {
    const err = { message: error.message }
    return new Response(JSON.stringify(err), {
      status: 400
    })
  }
  const response = { message: "delete success!" }
  return new Response(JSON.stringify(response), {
    status: 200
  })
}
