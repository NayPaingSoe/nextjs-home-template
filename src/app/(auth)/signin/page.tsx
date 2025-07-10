import Link from "next/link";
import Image from "next/image";
import React from "react";
import SignInForm from "./components/SignInForm";

export default function SignInPage() {
  return (
    <div className="max-h-screen flex">
      {/* Image Column */}
      <div className="hidden lg:flex w-1/2 items-center justify-center overflow-hidden">
        <Image
          src="/images/login-banner.png"
          alt="Login Banner"
          width={600}
          height={500}
          className="object-contain w-full"
        />
      </div>

      {/* Form Column */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-4">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Image
            className="mx-auto h-12 w-auto"
            src="/images/givecredit-logo.png"
            alt="Logo"
            width={48}
            height={48}
          />
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 sm:px-10">
            {/* <!-- Google Login Button --> */}
            <div>
              <a
                href="#"
                className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 488 512"
                >
                  <path
                    fill="#4285F4"
                    d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                  />
                </svg>
                Login with Google
              </a>
            </div>

            {/* <!-- Divider --> */}
            <div className="mt-6">
              <p className="flex justify-center">OR</p>
            </div>

            {/* <!-- Email/Password Form --> */}
            <SignInForm />
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/signup"
              className="font-medium text-black hover:text-gray-800"
            >
              Register Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
