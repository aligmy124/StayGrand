"use client";

import { Mail, ArrowRight, Send, KeyRound, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { ForgetPasswordFormData, ForgetPasswordSchema } from "../Schema/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgetPasswordAction } from "../Actions/ForgetPasswordAction";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ForgetPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<ForgetPasswordFormData>({
    resolver: zodResolver(ForgetPasswordSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: ForgetPasswordFormData) => {
    const result = await forgetPasswordAction(data);
    if (!result.success) {
      toast.error(result?.message);
      // Set field-specific errors
      if (result?.fieldErrors) {
        Object.entries(result.fieldErrors).forEach(([field, message]) => {
          setError(field as keyof ForgetPasswordFormData, {
            type: "manual",
            message: message as string,
          });
        });
      }
      return;
    }
    router.push("/reset");
    toast.success(result.message);
  };

  return (
    <main
      className="relative min-h-screen overflow-hidden bg-[#f4f1eb]"
      role="main"
      aria-label="Forgot password page"
    >
      {/* Background */}
      <div className="absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/hero2.jpg')",
          }}
        />

        {/* Dark cinematic overlay */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Soft gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1c251d]/80 via-black/30 to-black/70" />

        {/* Ambient light */}
        <div className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-[#7d9078]/20 blur-[120px]" />
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#c7a86b]/15 blur-[120px]" />
      </div>

      {/* Main */}
      <div className="relative z-10 flex min-h-[calc(100vh-88px)] items-center justify-center px-4 py-10 sm:px-6 lg:px-10">
        <div className="grid w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/20 bg-white/10 shadow-2xl shadow-black/30 backdrop-blur-xl lg:grid-cols-[0.9fr_1.1fr]">
          
          {/* Left / Hotel Branding */}
          <section
            className="relative hidden min-h-[650px] flex-col items-center justify-center overflow-hidden p-10 lg:flex xl:p-14"
            aria-label="Hotel branding and security message"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" aria-hidden="true" />

            <div className="relative z-10 max-w-md text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5 text-[#d8bd7c]" aria-hidden="true" />
                StayCation
              </div>

              <h2 className="text-4xl font-semibold leading-tight tracking-tight text-white xl:text-5xl">
                Forgot your
                <br />
                <span className="text-[#c8d4c4]">password?</span>
              </h2>

              <p className="mt-6 max-w-sm text-sm leading-7 text-white/70 mx-auto">
                Don't worry, it happens to the best of us. Enter your email
                and we'll help you get back on track.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur-md">
                  <ShieldCheck className="h-4 w-4 text-[#c8d4c4]" aria-hidden="true" />
                  Secure recovery
                </div>

                <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur-md">
                  <KeyRound className="h-4 w-4 text-[#c8d4c4]" aria-hidden="true" />
                  Quick reset
                </div>
              </div>
            </div>
          </section>

          {/* Right / Forget Password Form */}
          <section
            className="flex items-center bg-[#faf9f6]/95 px-5 py-10 sm:px-10 sm:py-12 lg:px-12 xl:px-16"
            aria-label="Forgot password form"
          >
            <div className="mx-auto w-full max-w-md">
              {/* Mobile Brand */}
              <div className="mb-8 flex justify-center lg:hidden" aria-hidden="true">
                <Link href="/" className="flex items-center gap-2.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#4e604f] text-white shadow-md">
                    <span className="text-lg font-bold">S</span>
                  </div>

                  <div className="text-xl font-bold tracking-tight text-[#202420]">
                    Stay<span className="text-[#4e604f]">Cation</span>
                  </div>
                </Link>
              </div>

              {/* Header */}
              <div className="text-center">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#4e604f]/15 bg-[#4e604f]/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#4e604f]">
                  <KeyRound className="h-3.5 w-3.5" aria-hidden="true" />
                  Forgot Password
                </div>

                <h1 className="text-3xl font-bold tracking-tight text-[#202420] sm:text-4xl">
                  Reset your password
                </h1>

                <p className="mt-3 text-sm leading-6 text-[#687068]">
                  Enter your email address and we'll send you a verification code
                  to reset your password.
                </p>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-8 space-y-5"
                noValidate
                aria-label="Forgot password form"
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
                      className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#899189]"
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

                {/* Info Message */}
                <div
                  className="flex gap-3 rounded-xl border border-[#4e604f]/10 bg-[#4e604f]/5 p-3.5"
                  role="note"
                  aria-label="Information note"
                >
                  <Send className="mt-0.5 h-4 w-4 shrink-0 text-[#4e604f]" aria-hidden="true" />
                  <p className="text-xs leading-5 text-[#687068]">
                    <span className="font-semibold text-[#4e604f]">Note:</span> A 4-digit verification code will be sent to your email address.
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#4e604f] text-sm font-semibold text-white shadow-lg shadow-[#4e604f]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#3f503f] hover:shadow-xl hover:shadow-[#4e604f]/25 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 focus:outline-none focus:ring-2 focus:ring-[#4e604f] focus:ring-offset-2 focus:ring-offset-white"
                  aria-label={isSubmitting ? "Sending reset link..." : "Send reset link"}
                >
                  {isSubmitting ? (
                    <>
                      <span
                        className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                        aria-hidden="true"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Reset Link
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </>
                  )}
                </button>

                {/* Back to Login */}
                <p className="pt-1 text-center text-sm text-[#687068]">
                  Remember your password?{" "}
                  <Link
                    href="/login"
                    className="font-semibold text-[#4e604f] transition-colors hover:text-[#354336] hover:underline focus:outline-none focus:ring-2 focus:ring-[#4e604f] focus:ring-offset-2 rounded"
                    aria-label="Back to sign in page"
                  >
                    Back to Sign In
                  </Link>
                </p>

                {/* Footer */}
                <div
                  className="mt-6 flex items-center justify-center gap-2 text-[11px] text-[#687068]/60"
                  aria-hidden="true"
                >
                  <ShieldCheck className="h-3.5 w-3.5 text-[#4e604f]" />
                  Secure account recovery
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}