import Sidebar from '@/app/components/sidebars/Sidebar';
import SidebarContextProvider from '@/app/context/SidebarContext';
import ThemeContextProvider from '@/app/context/ThemeContext';

export default function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeContextProvider>
      <SidebarContextProvider>
        <Sidebar>{children}</Sidebar>
      </SidebarContextProvider>
    </ThemeContextProvider>
  );
}
