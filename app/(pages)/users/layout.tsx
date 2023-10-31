import SidebarMenu from '@/app/components/sidebars/SidebarMenu';

export default function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex h-full space-x-4'>
      <SidebarMenu />
      {children}
    </div>
  );
}
