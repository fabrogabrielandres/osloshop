import '../globals.css';
export default function shopLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-red-600">
      {children}
    </main>
  );
}