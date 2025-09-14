import { cookies } from "next/headers";
import { AdminPage } from "@/screens/admin/admin";
import { ADMIN_COOKIE_NAME } from "@/shared/constants/constants";

export default function Admin() {
  const cookieStore = cookies();
  const authCookie = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  const isAuthenticated = !!authCookie;
  return <AdminPage authenticated={isAuthenticated} />;
}
