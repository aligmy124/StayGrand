import Link from "next/link";

export default function NotFoundButton() {
  return (
    <div>
      <h1>Room Not Found</h1>

      <Link href="/">
        Back to Home
      </Link>
    </div>
  );
}