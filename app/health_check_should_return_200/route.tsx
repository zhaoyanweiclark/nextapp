export const dynamic = 'force-dynamic'

export async function GET() {
  const response = { message: "ok" }
  return new Response(JSON.stringify(response), {
    status: 200
  });
}