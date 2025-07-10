"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hook";
import { setToken, setUserData } from "@/redux/features/AuthSlice";
import http from "@/redux/http";
import { Button } from "@/components/ui/button";

type SignInFormValues = {
  email: string;
  password: string;
};
type Errors = {
  email?: string[];
  password?: string[];
};

export default function SignInForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>({
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<SignInFormValues> = async (data) => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);

      const response = await http.login("/login", formData);

      if (response.status === 422 && response.data.errors) {
        console.log("true", true);
        const apiErrors: Errors = response.data.errors;
        (Object.keys(apiErrors) as Array<keyof Errors>).forEach((key) => {
          const message = apiErrors[key]?.[0];
          if (message) {
            setError(key, { type: "manual", message });
          }
        });
        toast.error("Login failed.", {
          description: apiErrors.password
            ? apiErrors.password[0]
            : apiErrors.email
            ? apiErrors.email[0]
            : "Please check your credentials and try again.",
        });
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
          })
        );

        toast.success("Login successful!", {
          description: "Welcome back!",
        });

        const redirectUrl = `/`;
        router.push(redirectUrl);
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Login failed.", {
        description: "Please check your credentials and try again.",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <form className="mt-6 space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
        <Button
          disabled={loading}
          type="submit"
          className="w-full flex justify-center py-6 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </div>
    </form>
  );
}
