"use server";

import { removeToken } from "@/lib/cookies/cookies";
import { redirect } from "next/navigation";

export async function logoutAction() {
  await removeToken();

  redirect("/login");
}