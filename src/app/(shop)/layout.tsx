import "../globals.css";
import { Footer, Sidebar, TopMenu } from "@/components";
export default function shopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen">
      <TopMenu />
      <Sidebar />
      {children}
      <Footer />
    </main>
  );
}
