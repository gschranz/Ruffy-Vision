import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// Get password from environment variable
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'jarvis2024'

// Simple session token generation
function generateSessionToken(): string {
  return Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    // Verify password
    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      )
    }

    // Generate session token
    const sessionToken = generateSessionToken()
    
    // Set HTTP-only cookie
    const cookieStore = await cookies()
    cookieStore.set('session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    )
  }
}
