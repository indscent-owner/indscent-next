export const runtime = 'edge'

export async function GET() {
  // Redirect to the static file in /public
  return Response.redirect('/perfume-list.pdf', 302)
}
