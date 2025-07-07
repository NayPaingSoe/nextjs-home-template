"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useForm } from "react-hook-form";

type SignUpFormValues = {
  email: string;
  password: string;
  password_confirmation: string;
};
type Errors = {
  email?: string[];
  password?: string[];
  password_confirmation?: string[];
};

export default function SignUpForm() {
  const [step, setStep] = useState(1);
  const [value, setValue] = useState("");

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    reValidateMode: "onChange",
  });

  const onSubmit = (data: SignUpFormValues) => {
    console.log(data);
    // setStep(2);
  };
  return (
    <>
      {step == 1 && (
        <form
          className="mt-6 space-y-6"
          onSubmit={handleSubmit(onSubmit)}
          action="#"
          method="POST"
        >
          <div>
            <div className="mt-1">
              <Input
                id="email"
                type="email"
                placeholder="Email"
                autoComplete="false"
                {...register("email", {
                  required: "Email is required.",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Please enter a valid email address.",
                  },
                })}
                error={!!errors.email}
                hint={errors.email?.message}
              />
            </div>
          </div>

          <div>
            <div className="mt-1">
              <Input
                id="password"
                type="password"
                placeholder="Password"
                autoComplete="false"
                {...register("password", {
                  required: "Password is required.",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long.",
                  },
                  maxLength: {
                    value: 20,
                    message: "Password must be at most 20 characters long.",
                  },
                })}
                error={!!errors.password}
                hint={errors.password?.message}
              />
            </div>
          </div>
          <div>
            <div className="mt-1">
              <Input
                id="password_confirmation"
                type="password"
                placeholder="Confirm Password"
                autoComplete="false"
                {...register("password_confirmation", {
                  required: "Password is required.",
                  validate: (value: string) => {
                    const password = errors.password?.message;
                    if (!password) return true;
                    return value === password;
                  },
                })}
                error={!!errors.password_confirmation}
                hint={errors.password_confirmation?.message}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Send Code
          </button>
        </form>
      )}

      {step == 2 && (
        <VerifyCode
          setStep={setStep}
          value={value}
          setValue={setValue}
        ></VerifyCode>
      )}
    </>
  );
}

interface VerifyCodeProps {
  setStep: (step: number) => void;
  value: string;
  setValue: (value: string) => void;
}
function VerifyCode(props: VerifyCodeProps) {
  return (
    <div className="my-6 ">
      <div className="flex items-center justify-center">
        <InputOTP maxLength={6} value={props.value} onChange={props.setValue}>
          <InputOTPGroup>
            <InputOTPSlot index={0} className="p-5" />
            <InputOTPSeparator />

            <InputOTPSlot index={1} className="p-5" />
            <InputOTPSeparator />

            <InputOTPSlot index={2} className="p-5" />
            <InputOTPSeparator />

            <InputOTPSlot index={3} className="p-5" />
            <InputOTPSeparator />

            <InputOTPSlot index={4} className="p-5" />
            <InputOTPSeparator />

            <InputOTPSlot index={5} className="p-5" />
          </InputOTPGroup>
        </InputOTP>
      </div>

      <p className="text-center text-sm text-gray-500 my-2">
        Please enter the one-time password sent to your phone. {props.value}
      </p>
      <button
        type="submit"
        onClick={() => props.setStep(1)}
        className="mt-6 w-full flex justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        Register Now
      </button>
    </div>
  );
}
