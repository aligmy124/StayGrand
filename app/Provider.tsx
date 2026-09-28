import { Toaster } from "sonner";

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main>{children}</main>
      <Toaster />
    </>
  );
}
