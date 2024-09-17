import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function CheckOutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await auth();
  if (!user) {
    redirect("/");
  }
  return <>{children}</>;
}
