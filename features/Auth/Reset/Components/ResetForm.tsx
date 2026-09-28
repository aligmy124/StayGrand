"use client";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  KeyRound,
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { ResetFormData, ResetSchema } from "../Schema/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetAction } from "../Actions/ResetActions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ResetForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<ResetFormData>({
    resolver: zodResolver(ResetSchema),
  });

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async (data: ResetFormData) => {
    const result = await resetAction(data);

    if (!result.success) {
      toast.error(result.message);

      if (result.fieldErrors) {
        Object.entries(result.fieldErrors).forEach(([field, message]) => {
          setError(field as keyof ResetFormData, {
            type: "manual",
            message: message as string,
          });
        });
      }

      return;
    }

    toast.success(result.message);
    router.push("/login");
  };

  return (
    <main 
      className="relative min-h-screen overflow-hidden bg-[#f4f1eb]"
      role="main"
      aria-label="Password reset page"
    >
      {/* Main */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 lg:px-10">
        <div className="grid w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/20 bg-white/10 shadow-2xl shadow-black/30 backdrop-blur-xl lg:grid-cols-[0.9fr_1.1fr]">
          
          {/* Left / Hotel message */}
          <section 
            className="relative hidden min-h-[650px] flex-col justify-center overflow-hidden p-10 lg:flex xl:p-14"
            aria-label="Hotel branding and security message"
          >
            {/* Background image confined to this section only */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url('/images/reset.png')",
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

            {/* Extra top-down gradient for text legibility */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
              aria-hidden="true"
            />

            <div className="relative z-10 max-w-md">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5 text-[#d8bd7c]" aria-hidden="true" />
                StayCation
              </div>

              <h2 className="text-4xl font-semibold leading-tight tracking-tight text-white xl:text-5xl">
                A better stay
                <br />
                starts with
                <br />
                <span className="text-[#c8d4c4]">peace of mind.</span>
              </h2>

              <p className="mt-6 max-w-sm text-sm leading-7 text-white/70">
                Secure your account and get back to discovering beautiful
                rooms, memorable stays, and your next perfect escape.
              </p>

              <div className="mt-8 flex items-center gap-3 text-sm text-white/70">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10" aria-hidden="true">
                  <ShieldCheck className="h-4 w-4 text-[#c8d4c4]" />
                </div>
                Your account is protected with secure verification.
              </div>
            </div>
          </section>

          {/* Right / Form */}
          <section 
            className="flex items-center bg-[#faf9f6]/95 px-5 py-10 sm:px-10 sm:py-12 lg:px-12 xl:px-16"
            aria-label="Password reset form"
          >
            <div className="mx-auto w-full max-w-md">
              {/* Mobile brand */}
              <div className="mb-8 flex items-center gap-2 lg:hidden" aria-hidden="true">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#4e604f]">
                  <span className="font-bold text-white">S</span>
                </div>
                <span className="font-bold text-[#202420]">
                  Stay<span className="text-[#4e604f]">Cation</span>
                </span>
              </div>

              {/* Heading */}
              <div>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#4e604f]/15 bg-[#4e604f]/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#4e604f]">
                  <KeyRound className="h-3.5 w-3.5" aria-hidden="true" />
                  Account Recovery
                </div>

                <h1 className="text-3xl font-bold tracking-tight text-[#202420] sm:text-4xl">
                  Reset your password
                </h1>

                <p className="mt-3 text-sm leading-6 text-[#687068]">
                  Enter your email, verification code, and create a new secure
                  password.
                </p>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-8 space-y-5"
                noValidate
                aria-label="Password reset form"
              >
                {/* Email */}
                <div>
                  <label 
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-[#303530]"
                  >
                    Email address
                  </label>

                  <div className="relative">
                    <Mail 
                      className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-[#899189]" 
                      aria-hidden="true" 
                    />

                    <input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
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

                {/* Verification Code */}
                <div>
                  <label 
                    htmlFor="seed"
                    className="mb-2 block text-sm font-semibold text-[#303530]"
                  >
                    Verification code
                  </label>

                  <div className="relative">
                    <ShieldCheck 
                      className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-[#899189]" 
                      aria-hidden="true" 
                    />

                    <input
                      id="seed"
                      type="text"
                      inputMode="numeric"
                      placeholder="Enter your 6-digit code"
                      autoComplete="one-time-code"
                      aria-required="true"
                      aria-invalid={!!errors.seed}
                      aria-describedby={errors.seed ? "seed-error" : undefined}
                      {...register("seed")}
                      className={`h-12 w-full rounded-xl border bg-white pl-11 pr-4 text-sm tracking-[0.12em] text-[#202420] outline-none transition-all placeholder:tracking-normal placeholder:text-[#a2a8a2] ${
                        errors.seed
                          ? "border-red-400 focus:ring-4 focus:ring-red-500/10"
                          : "border-[#dfe2dc] focus:border-[#4e604f] focus:ring-4 focus:ring-[#4e604f]/10"
                      }`}
                    />
                  </div>

                  {errors.seed && (
                    <p 
                      id="seed-error"
                      className="mt-1.5 text-xs font-medium text-red-500"
                      role="alert"
                    >
                      {errors.seed.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label 
                    htmlFor="password"
                    className="mb-2 block text-sm font-semibold text-[#303530]"
                  >
                    New password
                  </label>

                  <div className="relative">
                    <Lock 
                      className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-[#899189]" 
                      aria-hidden="true" 
                    />

                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      autoComplete="new-password"
                      aria-required="true"
                      aria-invalid={!!errors.password}
                      aria-describedby={errors.password ? "password-error" : undefined}
                      {...register("password")}
                      className={`h-12 w-full rounded-xl border bg-white pl-11 pr-12 text-sm text-[#202420] outline-none transition-all placeholder:text-[#a2a8a2] ${
                        errors.password
                          ? "border-red-400 focus:ring-4 focus:ring-red-500/10"
                          : "border-[#dfe2dc] focus:border-[#4e604f] focus:ring-4 focus:ring-[#4e604f]/10"
                      }`}
                    />

                    <button
                      type="button"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-[#899189] transition hover:bg-[#4e604f]/5 hover:text-[#303530] focus:outline-none focus:ring-2 focus:ring-[#4e604f]/50"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4.5 w-4.5" aria-hidden="true" />
                      ) : (
                        <Eye className="h-4.5 w-4.5" aria-hidden="true" />
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

                {/* Confirm Password */}
                <div>
                  <label 
                    htmlFor="confirmPassword"
                    className="mb-2 block text-sm font-semibold text-[#303530]"
                  >
                    Confirm password
                  </label>

                  <div className="relative">
                    <Lock 
                      className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-[#899189]" 
                      aria-hidden="true" 
                    />

                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Repeat your new password"
                      autoComplete="new-password"
                      aria-required="true"
                      aria-invalid={!!errors.confirmPassword}
                      aria-describedby={errors.confirmPassword ? "confirm-password-error" : undefined}
                      {...register("confirmPassword")}
                      className={`h-12 w-full rounded-xl border bg-white pl-11 pr-12 text-sm text-[#202420] outline-none transition-all placeholder:text-[#a2a8a2] ${
                        errors.confirmPassword
                          ? "border-red-400 focus:ring-4 focus:ring-red-500/10"
                          : "border-[#dfe2dc] focus:border-[#4e604f] focus:ring-4 focus:ring-[#4e604f]/10"
                      }`}
                    />

                    <button
                      type="button"
                      aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-[#899189] transition hover:bg-[#4e604f]/5 hover:text-[#303530] focus:outline-none focus:ring-2 focus:ring-[#4e604f]/50"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4.5 w-4.5" aria-hidden="true" />
                      ) : (
                        <Eye className="h-4.5 w-4.5" aria-hidden="true" />
                      )}
                    </button>
                  </div>

                  {errors.confirmPassword && (
                    <p 
                      id="confirm-password-error"
                      className="mt-1.5 text-xs font-medium text-red-500"
                      role="alert"
                    >
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                {/* Security note */}
                <div 
                  className="flex gap-3 rounded-xl border border-[#4e604f]/10 bg-[#4e604f]/5 p-3.5"
                  role="note"
                  aria-label="Security tip"
                >
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#4e604f]" aria-hidden="true" />
                  <p className="text-xs leading-5 text-[#687068]">
                    Choose a strong password that you don't use on other
                    websites.
                  </p>
                </div>

                {/* Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#4e604f] text-sm font-semibold text-white shadow-lg shadow-[#4e604f]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#3f503f] hover:shadow-xl hover:shadow-[#4e604f]/25 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 focus:outline-none focus:ring-2 focus:ring-[#4e604f] focus:ring-offset-2 focus:ring-offset-white"
                  aria-label={isSubmitting ? "Resetting password..." : "Reset password"}
                >
                  {isSubmitting ? (
                    <>
                      <span className="h-4.5 w-4.5 animate-spin rounded-full border-2 border-white/30 border-t-white" aria-hidden="true" />
                      Resetting password...
                    </>
                  ) : (
                    <>
                      Reset password
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </>
                  )}
                </button>

                {/* Login */}
                <p className="pt-1 text-center text-sm text-[#687068]">
                  Remember your password?{" "}
                  <Link
                    href="/login"
                    className="font-semibold text-[#4e604f] transition hover:text-[#344334] hover:underline focus:outline-none focus:ring-2 focus:ring-[#4e604f] focus:ring-offset-2 rounded"
                    aria-label="Sign in to your account"
                  >
                    Sign in
                  </Link>
                </p>
              </form>

              {/* Footer */}
              <div 
                className="mt-8 flex items-center justify-center gap-2 text-[11px] text-[#9aa09a]"
                aria-hidden="true"
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                Secure account recovery
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}