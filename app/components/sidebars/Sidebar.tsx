import getUser from '@/app/actions/getUser';
import getTasks from '@/app/actions/getTasks';

import MenuSidebar from './MenuSidebar';
import TaskSidebar from './TaskSidebar';
import getLists from '@/app/actions/getLists';
import MobileSidebar from './MenuSidebarTasks';

async function Sidebar({ children }: { children: React.ReactNode }) {
  const user: any = await getUser();
  const tasks = await getTasks();
  const lists = await getLists();

  return (
    <div
      className='
      h-full
      p-4
      flex
      max-h-screen
      lg:space-x-4
      bg-background_LM
      dark:bg-background_DM/90 
      text-text_LM
      dark:text-text_DM'>
      <MenuSidebar
        user={user}
        tasks={tasks}
        lists={lists}
      />
      <main className='w-full'>{children}</main>
      <TaskSidebar lists={lists} />
    </div>
  );
}

export default Sidebar;
