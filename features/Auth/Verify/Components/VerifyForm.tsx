"use client";

import { Mail, ShieldCheck, ArrowRight, CheckCircle, Sparkles, KeyRound } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { VerifyFormData, VerifySchema } from "../Schema/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifyAction } from "../Actions/VerifyAction";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function VerifyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VerifyFormData>({
    resolver: zodResolver(VerifySchema),
  });

  const router = useRouter();

  const onSubmit = async (data: VerifyFormData) => {
    const result = await verifyAction(data);
    if (!result.success) {
      toast.error(result?.message);
      return;
    }
    router.push("/login");
    toast.success(result.message);
  };

  const handleResendCode = () => {
    toast.info("A new verification code has been sent to your email.");
  };

  return (
    <main
      className="relative min-h-screen overflow-hidden bg-[#f4f1eb]"
      role="main"
      aria-label="Email verification page"
    >
      {/* Main */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 lg:px-10">
        <div className="grid w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/20 bg-white/10 shadow-2xl shadow-black/30 backdrop-blur-xl lg:grid-cols-[0.9fr_1.1fr]">
          
          {/* Left / Hotel Branding */}
          <section
            className="relative hidden min-h-[650px] flex-col items-center justify-center overflow-hidden p-10 lg:flex xl:p-14"
            aria-label="Hotel branding and verification message"
          >
            {/* Background image confined to this section only */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url('/images/hero2.jpg')",
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

            <div className="relative z-10 max-w-md text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5 text-[#d8bd7c]" aria-hidden="true" />
                StayCation
              </div>

              <h2 className="text-4xl font-semibold leading-tight tracking-tight text-white xl:text-5xl">
                Verify your
                <br />
                <span className="text-[#c8d4c4]">email address</span>
              </h2>

              <p className="mt-6 max-w-sm text-sm leading-7 text-white/70 mx-auto">
                One more step to unlock unforgettable stays and seamless
                bookings at the world's finest hotels.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur-md">
                  <ShieldCheck className="h-4 w-4 text-[#c8d4c4]" aria-hidden="true" />
                  Secure verification
                </div>

                <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur-md">
                  <CheckCircle className="h-4 w-4 text-[#c8d4c4]" aria-hidden="true" />
                  Instant access
                </div>
              </div>
            </div>
          </section>

          {/* Right / Verify Form */}
          <section
            className="flex items-center bg-[#faf9f6]/95 px-5 py-10 sm:px-10 sm:py-12 lg:px-12 xl:px-16"
            aria-label="Email verification form"
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
                  <CheckCircle className="h-3.5 w-3.5" aria-hidden="true" />
                  Verify Account
                </div>

                <h1 className="text-3xl font-bold tracking-tight text-[#202420] sm:text-4xl">
                  Verify your email
                </h1>

                <p className="mt-3 text-sm leading-6 text-[#687068]">
                  Enter the 4-digit verification code sent to your email
                  address to complete your registration.
                </p>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-8 space-y-5"
                noValidate
                aria-label="Email verification form"
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

                {/* Verification Code */}
                <div>
                  <label
                    htmlFor="code"
                    className="mb-2 block text-sm font-semibold text-[#303530]"
                  >
                    Verification code
                  </label>

                  <div className="relative">
                    <KeyRound
                      className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#899189]"
                      aria-hidden="true"
                    />

                    <input
                      id="code"
                      type="text"
                      inputMode="numeric"
                      placeholder="Enter 4-digit code"
                      maxLength={6}
                      aria-required="true"
                      aria-invalid={!!errors.code}
                      aria-describedby={errors.code ? "code-error" : undefined}
                      {...register("code")}
                      className={`h-12 w-full rounded-xl border bg-white pl-11 pr-4 text-sm tracking-[0.12em] text-[#202420] outline-none transition-all placeholder:tracking-normal placeholder:text-[#a2a8a2] ${
                        errors.code
                          ? "border-red-400 focus:ring-4 focus:ring-red-500/10"
                          : "border-[#dfe2dc] focus:border-[#4e604f] focus:ring-4 focus:ring-[#4e604f]/10"
                      }`}
                    />
                  </div>

                  {errors.code && (
                    <p
                      id="code-error"
                      className="mt-1.5 text-xs font-medium text-red-500"
                      role="alert"
                    >
                      {errors.code.message}
                    </p>
                  )}

                  <p className="mt-2 text-xs text-[#687068]">
                    We sent a 4-digit code to your email. Please check your inbox.
                  </p>
                </div>

                {/* Verify Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#4e604f] text-sm font-semibold text-white shadow-lg shadow-[#4e604f]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#3f503f] hover:shadow-xl hover:shadow-[#4e604f]/25 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 focus:outline-none focus:ring-2 focus:ring-[#4e604f] focus:ring-offset-2 focus:ring-offset-white"
                  aria-label={isSubmitting ? "Verifying..." : "Verify your account"}
                >
                  {isSubmitting ? (
                    <>
                      <span
                        className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                        aria-hidden="true"
                      />
                      Verifying...
                    </>
                  ) : (
                    <>
                      Verify Account
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </>
                  )}
                </button>

                {/* Resend & Login links */}
                <div className="space-y-3 text-center">
                  <p className="text-sm text-[#687068]">
                    Didn't receive the code?{" "}
                    <button
                      type="button"
                      onClick={handleResendCode}
                      className="font-semibold text-[#4e604f] transition-colors hover:text-[#354336] hover:underline focus:outline-none focus:ring-2 focus:ring-[#4e604f] focus:ring-offset-2 rounded"
                      aria-label="Resend verification code"
                    >
                      Resend Code
                    </button>
                  </p>
                </div>

                {/* Footer */}
                <div
                  className="mt-6 flex items-center justify-center gap-2 text-[11px] text-[#687068]/60"
                  aria-hidden="true"
                >
                  <ShieldCheck className="h-3.5 w-3.5 text-[#4e604f]" />
                  Secure email verification
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}