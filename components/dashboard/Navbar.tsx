"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "../Logout";

export default function Navbar({ user }: { user: any }) {
  const pathname = usePathname();

  return (
    <nav className="flex space-x-8">
      <Link
        href={user.role === "ADMIN" ? "/admin" : "/dashboard"}
        className={`${
          pathname === (user.role === "ADMIN" ? "/admin" : "/dashboard")
            ? "text-blue-600"
            : "text-gray-700"
        } hover:text-blue-500 px-3 py-2 text-sm font-medium`}
      >
        {user.role === "ADMIN" ? "Admin" : "Dashboard"}
      </Link>
      <Link
        href="/profile"
        className={`${
          pathname === "/profile" ? "text-blue-600" : "text-gray-700"
        } hover:text-blue-500 px-3 py-2 text-sm font-medium`}
      >
        Profile
      </Link>
      <Link
        href="/changepassword"
        className={`${
          pathname === "/changepassword" ? "text-blue-600" : "text-gray-700"
        } hover:text-blue-500 px-3 py-2 text-sm font-medium`}
      >
        Security
      </Link>
      {user.role === "ADMIN" && (
        <Link
          href="/admin/users"
          className={`${
            pathname === "/admin/users" ? "text-blue-600" : "text-gray-700"
          } hover:text-blue-500 px-3 py-2 text-sm font-medium`}
        >
          Users
        </Link>
      )}
      <div className="ml-4 flex items-center">
        <span className="text-gray-500 text-sm mr-3">
          Logged in as {user.name}
        </span>
        <LogoutButton />
      </div>
    </nav>
  );
}
