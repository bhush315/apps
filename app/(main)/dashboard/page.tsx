import { getCurrentUser } from "@/app/libs/auth";
import Header from "@/components/dashboard/Header";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

          <div className="mb-8 p-6 bg-blue-50 rounded-lg">
            <h2 className="text-xl font-semibold mb-2 text-gray-600">
              Welcome back, {user?.name}!
            </h2>
            <p className="text-gray-600">Email: {user?.email}</p>
            <p className="text-gray-600">Role: {user?.role}</p>
          </div>
        </div>
      </div>
    </>
  );
}
