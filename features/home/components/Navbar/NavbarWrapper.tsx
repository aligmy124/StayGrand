import { getCurrentUser } from "@/features/Auth/user_Info/service/user.service";
import Navbar from "./Navbar";

export default async function NavbarWrapper() {
  const user = await getCurrentUser();

  return <Navbar key={user?._id ?? "guest"} user={user} />;
}