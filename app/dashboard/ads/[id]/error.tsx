"use client";

interface IError{
  error:Error,
  reset:()=>void
}

export default function Error({error,reset}:IError) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="rounded-2xl bg-white p-10 shadow-lg text-center max-w-md">
        <h1 className="text-3xl font-bold text-red-600">
          {error.message}
        </h1>
        <button
          onClick={reset}
          className="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}