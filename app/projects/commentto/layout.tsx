export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="max-w-3xl mx-auto px-6 py-30">{children}</div>;
}
