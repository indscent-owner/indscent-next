export const runtime = 'edge';

export async function POST(request) {
  const { name, product, quantity } = await request.json()

  if (!name || !product || !quantity) {
    return Response.json({ message: 'All fields are required.' }, { status: 400 })
  }

  return Response.json({
    message: `Order received: ${quantity} x ${product} for ${name}.`
  })
}
