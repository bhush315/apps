import { generateToken } from "@/app/libs/auth";
import { prisma } from "@/app/libs/prisma";
import { NextResponse } from "next/server";

// Define the UserData interface for the expected body
interface UserData {
  name: string;
  email: string;
  password: string;
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { name, email, password }: UserData = await request.json();

    // Check for missing fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if the email is already in use
    const existingEmail = await prisma.user.findUnique({ where: { email } });
    if (existingEmail) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    // Create a new user in the database
    const user = await prisma.user.create({
      data: { name, email, password }, // Correctly pass the data field
    });

    const token = generateToken(user.id, user.role);

    const response = NextResponse.json(
      {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
      { status: 201 }
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
    return NextResponse.json(
      { error: "Unable to register user:" + error },
      { status: 500 }
    );
  }
}
