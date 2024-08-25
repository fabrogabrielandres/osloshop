import Hydration from "@/store/Hidratation/Hidratation";
import "../globals.css";
import { Footer, Sidebar, TopMenu } from "@/components";
export default function shopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen">
      {/* <Hydration/> */}
      <TopMenu />
      <Sidebar />
      {children}
      <Footer />
    </main>
  );
}
