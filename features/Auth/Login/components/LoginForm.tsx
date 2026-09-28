"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { LoginFormData, LoginSchema } from "../schema/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  ShieldCheck,
  ArrowRight,
  Hotel,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { loginAction } from "../actions/LoginAction";
import { toast } from "sonner";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: LoginFormData) => {
    const result = await loginAction(data);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
    const destination =
      redirect || (result.role === "admin" ? "/dashboard" : "/");

    router.replace(destination);
    router.refresh();
  };

  return (
    <main
      className="relative min-h-screen overflow-hidden bg-[#f4f1eb]"
      role="main"
      aria-label="Login page"
    >
      {/* Main */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 lg:px-10">
        <div className="grid w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/20 bg-white/10 shadow-2xl shadow-black/30 backdrop-blur-xl lg:grid-cols-[0.9fr_1.1fr]">
          {/* Left / Hotel Visual */}
          <section
            className="relative hidden min-h-[650px] flex-col justify-center overflow-hidden p-10 lg:flex xl:p-14"
            aria-label="Hotel branding and welcome message"
          >
            {/* Background image confined to this section only */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url('/images/login.png')",
              }}
              aria-hidden="true"
            />

            {/* Dark cinematic overlay */}
            <div className="absolute inset-0 bg-black/55" aria-hidden="true" />

            {/* Soft gradient */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-[#1c251d]/80 via-black/30 to-black/70"
              aria-hidden="true"
            />

            {/* Ambient light */}
            <div
              className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-[#7d9078]/20 blur-[120px]"
              aria-hidden="true"
            />
            <div
              className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#c7a86b]/15 blur-[120px]"
              aria-hidden="true"
            />

            <div className="relative z-10 max-w-md">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                <Sparkles
                  className="h-3.5 w-3.5 text-[#d8bd7c]"
                  aria-hidden="true"
                />
                StayCation
              </div>

              <h2 className="text-4xl font-semibold leading-tight tracking-tight text-white xl:text-5xl">
                Welcome back
                <br />
                to your
                <br />
                <span className="text-[#c8d4c4]">home away</span> from home.
              </h2>

              <p className="mt-6 max-w-sm text-sm leading-7 text-white/70">
                Sign in to manage your bookings and continue planning your next
                unforgettable escape.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur-md">
                  <ShieldCheck
                    className="h-4 w-4 text-[#c8d4c4]"
                    aria-hidden="true"
                  />
                  Secure booking
                </div>

                <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur-md">
                  <Hotel
                    className="h-4 w-4 text-[#c8d4c4]"
                    aria-hidden="true"
                  />
                  Exceptional stays
                </div>
              </div>
            </div>
          </section>

          {/* Right / Login Form */}
          <section
            className="flex items-center bg-[#faf9f6]/95 px-5 py-10 sm:px-10 sm:py-12 lg:px-12 xl:px-16"
            aria-label="Login form"
          >
            <div className="mx-auto w-full max-w-md">
              {/* Mobile Brand */}
              <div
                className="mb-8 flex items-center justify-center lg:hidden"
                aria-hidden="true"
              >
                <Link href="/" className="flex items-center gap-2.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#4e604f] text-white shadow-md">
                    <Hotel className="h-5 w-5" />
                  </div>

                  <div className="text-xl font-bold tracking-tight text-[#202420]">
                    Stay<span className="text-[#4e604f]">Cation</span>
                  </div>
                </Link>
              </div>

              {/* Header */}
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#4e604f]/15 bg-[#4e604f]/5 px-3 py-1.5">
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-[#4e604f]"
                    aria-hidden="true"
                  />
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#4e604f]">
                    Guest Account
                  </span>
                </div>

                <h1 className="text-3xl font-bold tracking-tight text-[#202420] sm:text-4xl">
                  Welcome back
                </h1>

                <p className="mt-2 max-w-sm text-sm leading-6 text-[#687068]">
                  Sign in to manage your bookings and continue planning your
                  next stay.
                </p>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-8 space-y-5"
                noValidate
                aria-label="Login form"
              >
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-xs font-semibold uppercase tracking-wide text-[#303530]"
                  >
                    Email address
                  </label>

                  <div className="group relative">
                    <Mail
                      className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#899189] transition-colors group-focus-within:text-[#4e604f]"
                      aria-hidden="true"
                    />

                    <input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      aria-describedby={
                        errors.email ? "email-error" : undefined
                      }
                      {...register("email")}
                      className={`h-12 w-full rounded-xl border bg-white pl-11 pr-4 text-sm text-[#202420] outline-none transition-all placeholder:text-[#a2a8a2] ${
                        errors.email
                          ? "border-red-400 focus:ring-4 focus:ring-red-500/10"
                          : "border-[#dfe2dc] focus:border-[#4e604f] focus:ring-4 focus:ring-[#4e604f]/10"
                      }`}
                    />
                  </div>

                  {errors.email && (
                    <p
                      id="email-error"
                      className="mt-1.5 text-xs font-medium text-red-500"
                      role="alert"
                    >
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-xs font-semibold uppercase tracking-wide text-[#303530]"
                    >
                      Password
                    </label>

                    <Link
                      href="/forget_password"
                      className="text-xs font-semibold text-[#4e604f] transition-colors hover:text-[#354336] focus:outline-none focus:ring-2 focus:ring-[#4e604f] focus:ring-offset-2 rounded"
                      aria-label="Forgot your password"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <div className="group relative">
                    <Lock
                      className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#899189] transition-colors group-focus-within:text-[#4e604f]"
                      aria-hidden="true"
                    />

                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      aria-required="true"
                      aria-invalid={!!errors.password}
                      aria-describedby={
                        errors.password ? "password-error" : undefined
                      }
                      {...register("password")}
                      className={`h-12 w-full rounded-xl border bg-white pl-11 pr-12 text-sm text-[#202420] outline-none transition-all placeholder:text-[#a2a8a2] ${
                        errors.password
                          ? "border-red-400 focus:ring-4 focus:ring-red-500/10"
                          : "border-[#dfe2dc] focus:border-[#4e604f] focus:ring-4 focus:ring-[#4e604f]/10"
                      }`}
                    />

                    <button
                      type="button"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-[#899189] transition-colors hover:bg-[#4e604f]/5 hover:text-[#4e604f] focus:outline-none focus:ring-2 focus:ring-[#4e604f]/50"
                    >
                      {showPassword ? (
                        <EyeOff
                          className="h-[18px] w-[18px]"
                          aria-hidden="true"
                        />
                      ) : (
                        <Eye className="h-[18px] w-[18px]" aria-hidden="true" />
                      )}
                    </button>
                  </div>

                  {errors.password && (
                    <p
                      id="password-error"
                      className="mt-1.5 text-xs font-medium text-red-500"
                      role="alert"
                    >
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#4e604f] text-sm font-semibold text-white shadow-lg shadow-[#4e604f]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#3f503f] hover:shadow-xl hover:shadow-[#4e604f]/25 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 focus:outline-none focus:ring-2 focus:ring-[#4e604f] focus:ring-offset-2 focus:ring-offset-white"
                  aria-label={
                    isSubmitting ? "Signing in..." : "Sign in to your account"
                  }
                >
                  {isSubmitting ? (
                    <>
                      <span
                        className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                        aria-hidden="true"
                      />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <LogIn className="h-4 w-4" aria-hidden="true" />
                      Sign in
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </>
                  )}
                </button>

                {/* Security note */}
                <div
                  className="flex items-center justify-center gap-2 pt-1 text-center text-[11px] text-[#687068]"
                  aria-hidden="true"
                >
                  <ShieldCheck className="h-3.5 w-3.5 text-[#4e604f]" />
                  <span>Your account and bookings are securely protected.</span>
                </div>

                {/* Divider */}
                <div className="relative py-2" aria-hidden="true">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#4e604f]/10" />
                  </div>

                  <div className="relative flex justify-center">
                    <span className="bg-[#faf9f6] px-3 text-[10px] font-medium uppercase tracking-wider text-[#687068]/40">
                      New to StayCation?
                    </span>
                  </div>
                </div>

                {/* Register */}
                <Link
                  href="/register"
                  className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#4e604f]/20 bg-white text-sm font-semibold text-[#4e604f] transition-all duration-300 hover:border-[#4e604f]/40 hover:bg-[#4e604f]/[0.04] focus:outline-none focus:ring-2 focus:ring-[#4e604f] focus:ring-offset-2"
                  aria-label="Create a new account"
                >
                  Create an account
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>

                {/* Footer */}
                <p className="pt-3 text-center text-[11px] leading-5 text-[#687068]/60">
                  By continuing, you agree to our{" "}
                  <Link
                    href="/terms"
                    className="text-[#4e604f] hover:underline focus:outline-none focus:ring-2 focus:ring-[#4e604f] focus:ring-offset-2 rounded"
                  >
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-[#4e604f] hover:underline focus:outline-none focus:ring-2 focus:ring-[#4e604f] focus:ring-offset-2 rounded"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </form>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}