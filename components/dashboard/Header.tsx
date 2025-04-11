import { getCurrentUser } from "@/app/libs/auth";
import { redirect } from "next/navigation";
import Navbar from "./Navbar";
import Link from "next/link";

export default async function Header() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">
              <Link href="/dashboard"> My App</Link>
            </h1>
          </div>
          <Navbar user={user} />
        </div>
      </div>
    </header>
  );
}
