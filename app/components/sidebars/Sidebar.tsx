import getUser from '@/app/actions/getUser';
import getTasks from '@/app/actions/getTasks';

import SidebarMenu from './SidebarMenu';
import SidebarTask from './SidebarTask';

async function Sidebar({ children }: { children: React.ReactNode }) {
  const user = await getUser();
  const tasks = await getTasks();

  return (
    <div className='h-full flex space-x-4'>
      <SidebarMenu
        user={user}
        tasks={tasks}
      />
      <main className='w-full'>{children}</main>
      <SidebarTask />
    </div>
  );
}

export default Sidebar;
