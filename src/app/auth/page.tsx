import { inter, titleFont } from "@/config/fonts";
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/auth/login")
  return (
    <>
      <h1 className={titleFont.className}>hola auth</h1>
      <h1 className={inter.className}    >hola auth</h1>
    </>
  );
}
