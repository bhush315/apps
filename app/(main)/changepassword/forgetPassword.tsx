"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";

export default function ChangePasswordPage() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);

    if (formData.newPassword !== formData.confirmPassword) {
      toast.dismiss();
      toast.error("New passwords do not match");
      setPending(false);

      return;
    }

    try {
      const res = await fetch("/api/loggedUser/password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.dismiss();
        toast.success("Password changed successfully!");
        router.push("/profile"); // Or wherever you'd like to redirect
      } else {
        toast.error(data.error || "Failed to change password");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setPending(false);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white text-gray-800 p-8 rounded-lg shadow-lg w-full sm:w-96">
          <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            Change Password
          </h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="form-group">
              <label
                htmlFor="currentPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={pending}
              className={
                pending
                  ? "cursor-not-allowed w-full py-2 bg-gray-500 text-white rounded-md"
                  : "cursor-pointer w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              }
            >
              {pending ? (
                <CgSpinner className="animate-spin mx-auto text-2xl" />
              ) : (
                "Change Password"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
