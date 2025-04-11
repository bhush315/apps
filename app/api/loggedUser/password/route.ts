import { comparePasswords, getCurrentUser } from "@/app/libs/auth";
import { prisma } from "@/app/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { currentPassword, newPassword, confirmPassword } =
    await request.json();

  // Ensure new password matches the confirmation password

  // Verify current password
  const passwordValid = await comparePasswords(currentPassword, user.password);
  if (!passwordValid) {
    return NextResponse.json(
      { error: "Current password is incorrect" },
      { status: 400 }
    );
  }

  // Update to new password (plain text)
  try {
    await prisma.user.update({
      where: { id: user.id },
      data: { password: newPassword }, // Storing the new password as plain text
    });

    return NextResponse.json({ message: "Password updated successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update password" },
      { status: 500 }
    );
  }
}
