"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hook";
import { useLogout } from "@/redux/http";
import { toast } from "sonner";
import axios from "axios";

export default function Navbar() {
  const { token } = useAppSelector((state) => state.auth);
  const [isMounted, setIsMounted] = useState(false);

  const logout = useLogout();
  async function logoutHandler() {
    try {
      await logout();
      toast.success("You have been logged out successfully.");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        toast.error(`Logout failed: ${error.response.data.message}`);
      } else {
        toast.error("An unknown error occurred during logout.");
      }
    }
  }
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <nav className="bg-gray-100 shadow">
      <div className="container mx-auto flex justify-around items-center px-6 py-4">
        <div className="text-xl font-bold">GiveCredit</div>
        <div className="flex space-x-8">
          <Link href="/" className="border-b-2 border-green-400 pb-1">
            Home
          </Link>
          <Link href="/loan" className="hover:text-green-500">
            Loan
          </Link>
          <Link href="/calculator" className="hover:text-green-500">
            Calculator
          </Link>
          <Link href="/resources" className="hover:text-green-500">
            Resources
          </Link>
          <Link href="/about" className="hover:text-green-500">
            About
          </Link>
        </div>
        <div>
          {isMounted ? (
            token ? (
              <Link href="/" onClick={logoutHandler}>
                <button className="bg-black text-white px-8 font-medium py-2">
                  Log out
                </button>
              </Link>
            ) : (
              <Link href="/signin">
                <button className="bg-black text-white px-8 font-medium py-2">
                  Login
                </button>
              </Link>
            )
          ) : (
            <div className="w-28 h-10" />
          )}
        </div>
      </div>
    </nav>
  );
}
