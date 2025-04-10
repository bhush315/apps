"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [pending, isPending] = useState(false);

  const handleLogout = async () => {
    isPending(true);
    try {
      const response = await fetch("/api/user/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Redirect to login page after successful logout
        router.push("/login");
        router.refresh(); // Ensure client cache is cleared
        isPending(false);
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="cursor-pointer px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
    >
      {pending ? "Loading..." : "Logout"}
    </button>
  );
}
