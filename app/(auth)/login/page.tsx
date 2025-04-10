"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";

const LoginPage = () => {
  useEffect(() => {
    const sus = localStorage.getItem("sus");
    if (sus) {
      toast.success(sus);
      localStorage.removeItem("sus");
    }
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [pending, isPending] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const loginHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    isPending(true);

    try {
      const res = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        router.push(data.redirectTo);
      } else {
        toast.dismiss();
        toast.error(data.error);
      }
    } catch (error) {
      toast.error("An error occurred. Login failed!");
    } finally {
      isPending(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black text-black">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Login
        </h1>
        <form className="space-y-4" onSubmit={loginHandler}>
          <div className="form-group">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={pending}
            className={
              pending
                ? "cursor-not-allowed w-full py-2 bg-gray-500 text-white rounded-md focus:ring-2 focus:ring-gray-500"
                : "cursor-pointer w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
            }
          >
            {pending ? (
              <CgSpinner className="text-2xl animate-spin mx-auto" />
            ) : (
              "Login"
            )}
          </button>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="/register" className="text-blue-500 hover:underline">
                Register here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
