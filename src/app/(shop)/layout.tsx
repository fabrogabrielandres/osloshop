import TopMenu from '@/components/ui/TopMenu/TopMenu';
import '../globals.css';
import Sidebar from '@/components/ui/Sidebar/Sidebar';
export default function shopLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen">
      <TopMenu />
      <Sidebar />
      {children}
    </main>
  );
}