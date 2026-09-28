import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold">404</h1>

        <h2 className="mt-4 text-2xl font-semibold">
          Page Not Found
        </h2>

        <p className="mt-2 text-gray-500">
          Sorry, the page you're looking for doesn't exist.
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex rounded-xl bg-[#4E604F] px-6 py-3 text-white"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}