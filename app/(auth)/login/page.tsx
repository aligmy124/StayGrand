import LoginForm from "@/features/Auth/Login/components/LoginForm";
import LoginSkeleton from "@/Shared/Components/LoginSkeleton";
import type { Metadata } from "next";
import { Suspense } from "react";
export const metadata: Metadata = {
  title: "Login",
  description:
    "Sign in to your account to access your dashboard, projects, and tasks.",
  robots: {
    index: false,
    follow: false,
  },
};
export default function Login() {
  return(
    <Suspense fallback={<LoginSkeleton/>}>
       <LoginForm />
    </Suspense>
  );
}
