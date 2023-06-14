export const dynamic = 'force-dynamic'

export async function GET() {
  const response = { message: `ok at version-${process.env.APP_VERSION || 0}` }
  return new Response(JSON.stringify(response), {
    status: 200
  });
}