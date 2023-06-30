export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const timeQuery = url.searchParams.get('time') || "0"
  const delays = Number.parseInt(timeQuery, 10)
  if (delays) {
    await new Promise(r => setTimeout(r, delays))
  }
  const res = {
    data: Array(20).fill({
      "firstName": "firstName",
      "lastName": "lastName",
      "age": 20,
    }),
    message: { message: `Response delayed by ${delays || 0} ms` },
  }
  return new Response(JSON.stringify(res), {
    status: 200
  });
}