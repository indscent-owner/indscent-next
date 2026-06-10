import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  const filePath = path.join(process.cwd(), 'public', 'perfume-list.pdf')
  const fileBuffer = fs.readFileSync(filePath)
  const year = new Date().getFullYear()

  return new NextResponse(fileBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="InDscent-Catalog-${year}.pdf"`
    }
  })
}
