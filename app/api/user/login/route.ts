import { generateToken } from "@/app/libs/auth";
import { prisma } from "@/app/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Check for missing fields
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    // Find the user in the database (no password hashing)
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // If user doesn't exist or password doesn't match
    if (!user || user.password !== password) {
      return NextResponse.json(
        { success: false, error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = generateToken(user.id, user.role);

    const response = NextResponse.json(
      {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        redirectTo: user.role === "ADMIN" ? "/admin" : "/dashboard",
      },

      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      sameSite: "strict",
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Unable to login" + error,
    });
  }

  // Successful login
}
