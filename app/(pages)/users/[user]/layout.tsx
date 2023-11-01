import Sidebar from '@/app/components/sidebars/Sidebar';

export default function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Sidebar>{children}</Sidebar>;
}
