import TopMenu from '@/components/ui/TopMenu/TopMenu';
import '../globals.css';
export default function shopLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen">
      <TopMenu />
      {children}
    </main>
  );
}