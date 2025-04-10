import { getCurrentUser } from "@/app/libs/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const user = await getCurrentUser();

  // Redirect if not admin
  if (!user || user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Admin Dashboard
        </h1>

        <div className="mb-8 p-6 bg-blue-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-2 text-gray-600">
            Welcome, Admin {user.name}!
          </h2>
          <p className="text-gray-600">Email: {user.email}</p>
          <p className="text-gray-600">You have administrator privileges</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 border rounded-lg">
            <h3 className="text-lg font-semibold mb-4">User Management</h3>
            <p className="text-gray-600 mb-4">Manage all registered users</p>
            <Link
              href="/admin/users"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              View Users
            </Link>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Content Management</h3>
            <p className="text-gray-600 mb-4">Manage all blog posts</p>
            <Link
              href="/admin/posts"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              View Posts
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
