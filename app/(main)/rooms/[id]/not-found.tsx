import NotFoundButton from "@/Shared/Components/NotFound";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">404</h1>

        <p className="mt-3 text-gray-500">
          The page you're looking for doesn't exist.
        </p>

        <NotFoundButton />
      </div>
    </div>
  );
}