import Image from "next/image";
import Link from "next/link";
import SignUpForm from "./components/signUpForm";

export default function SignUpPage() {
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
            {/* <!-- Email/Password Form --> */}
            <SignUpForm />

            <div className="mt-6 text-center">
              <Link
                href="/signin"
                className="font-medium text-black hover:text-gray-800"
              >
                Already have an account? Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
