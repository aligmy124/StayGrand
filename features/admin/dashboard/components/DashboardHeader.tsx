"use client";

export default function DashboardHeader() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="mb-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold text-[#1B1C1C] sm:text-3xl">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-[#8A9189]">
            Overview of your platform&apos;s activity and growth.
          </p>
        </div>
        <p className="text-xs text-[#8A9189]">{today}</p>
      </div>
    </header>
  );
}