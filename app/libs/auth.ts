import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { prisma } from "@/app/libs/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// No password hashing - store and compare plain text (INSECURE!)
export async function hashPassword(password: string): Promise<string> {
  return password; // Just return the plain password
}

export async function comparePasswords(
  password: string,
  storedPassword: string
): Promise<boolean> {
  return password === storedPassword; // Direct comparison
}

// Generate JWT token
export function generateToken(userId: string, role: string): string {
  return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: "1d" });
}

// Verify JWT token
export function verifyToken(
  token: string
): { userId: number; role: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: number; role: string };
  } catch (error) {
    return null;
  }
}

// Get current user from cookies
export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  const decoded = verifyToken(token);
  if (!decoded) return null;

  const user = await prisma.user.findUnique({
    where: { id: String(decoded.userId) },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
    },
  });

  return user;
}

// Check if current user is admin
export async function isAdmin() {
  const user = await getCurrentUser();
  return user?.role === "ADMIN";
}
