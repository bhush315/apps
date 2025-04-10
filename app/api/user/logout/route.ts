import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    // Clear the token cookie
    (
      await // Clear the token cookie
      cookies()
    ).delete("token");

    return NextResponse.json(
      { message: "Logged out successfully" },
      {
        headers: {
          // Ensure the Set-Cookie header is properly set
          "Set-Cookie": `token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Strict${
            process.env.NODE_ENV === "production" ? "; Secure" : ""
          }`,
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to logout" + error },
      { status: 500 }
    );
  }
}
