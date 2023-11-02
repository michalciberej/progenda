import Sidebar from '@/app/components/sidebars/Sidebar';
import SidebarContextProvider from '@/app/context/SidebarContext';

export default function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarContextProvider>
      <Sidebar>{children}</Sidebar>
    </SidebarContextProvider>
  );
}
