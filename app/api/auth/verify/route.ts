import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  const cookieStore = await cookies()
  const session = cookieStore.get('session')

  if (!session?.value) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  return NextResponse.json({ authenticated: true })
}
