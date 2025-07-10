"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import http from "@/redux/http";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hook";
import { setToken, setUserData } from "@/redux/features/AuthSlice";
import { Button } from "@/components/ui/button";

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
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<SignUpFormValues> = async (data) => {
    setLoading(true);
    console.log("Register");
    try {
      setEmail(data.email);
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("password_confirmation", data.password_confirmation);

      const response = await http.register("/register", formData);

      if (response.status === 422 && response.data.errors) {
        console.log("true", true);
        const apiErrors: Errors = response.data.errors;
        (Object.keys(apiErrors) as Array<keyof Errors>).forEach((key) => {
          const message = apiErrors[key]?.[0];
          if (message) {
            setError(key, { type: "manual", message });
          }
        });
        toast.error("Register failed.", {
          description: apiErrors.password
            ? apiErrors.password[0]
            : apiErrors.email
            ? apiErrors.email[0]
            : "Please check your credentials and try again.",
        });
      } else if (response.status === 200) {
        const { user } = response.data;
        console.log("user data:", user);
        toast.success("Code sent to your email!", {
          description: "Please check your email!",
        });
        setStep(2);
      }
    } catch (err) {
      console.error("Register error:", err);
      toast.error("Send code fail!.", {
        description: "Please check your internet connetion!",
      });
    } finally {
      setLoading(false);
    }
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
          <Button
            disabled={loading}
            type="submit"
            className="w-full flex justify-center py-6 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            {loading ? "Sending Code..." : "Send Code"}
          </Button>
        </form>
      )}

      {step == 2 && <VerifyCode email={email}></VerifyCode>}
    </>
  );
}

function VerifyCode({ email }: { email: string }) {
  const [value, setValue] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const [timer, setTimer] = useState(60);
  const [resendDisabled, setResendDisabled] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (resendDisabled) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 1) {
            clearInterval(interval as NodeJS.Timeout);
            setResendDisabled(false);
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval as NodeJS.Timeout);
  }, [resendDisabled]);

  const resendCode = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      const response = await http.resendcode(`/resend-code/${email}`, formData);
      if (response.status === 200) {
        toast.success("Code resent to your email!", {
          description: "Please check your email!",
        });
        setTimer(60);
        setResendDisabled(true);
      }
    } catch (err) {
      console.error("Resend code error:", err);
      toast.error("Failed to resend code.", {
        description: "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  const registerHandler = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("code", value);

      const response = await http.verifycode("/verify-code", formData);

      if (response.status === 422) {
        console.log("true", response.data.message);
        const message = response.data.message;
        setError(response.data.message);

        toast.error(message);
      } else if (response.status === 200) {
        const { user } = response.data;
        console.log("user data:", user);
        dispatch(setToken(response.data.token));
        dispatch(
          setUserData({
            id: user.id,
            name: user.name,
            email: user.email,
            status: user.status,
            profile_status: user.profile_status,
          })
        );

        toast.success("Register successful!", {
          description: "Welcome!",
        });
        // const redirectUrl = `/`;
        // router.push(redirectUrl);
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error("Register error:", err);
        toast.error(err.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="my-6 ">
      <p className="text-center text-sm text-gray-500 my-2">
        Please enter the one-time password sent to your email.
      </p>
      <div className="flex items-center justify-center my-4">
        <InputOTP maxLength={6} value={value} onChange={setValue}>
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

      <p className="text-center text-sm text-red-500 my-2">{error}</p>
      <div className="text-center text-sm text-gray-500 my-2">
        {resendDisabled ? (
          <p>Resend code in {timer}s</p>
        ) : (
          <Button
            onClick={resendCode}
            disabled={loading}
            className="text-black"
            variant="link"
          >
            Resend Code
          </Button>
        )}
      </div>
      <Button
        disabled={loading}
        onClick={registerHandler}
        className="mt-6 w-full flex justify-center py-6 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        {loading ? "Verifing Code " : "Verify Code"}
      </Button>
    </div>
  );
}
