import getUser from '@/app/actions/getUser';
import getTasks from '@/app/actions/getTasks';

import MenuSidebar from './MenuSidebar';
import TaskSidebar from './TaskSidebar';

async function Sidebar({ children }: { children: React.ReactNode }) {
  const user = await getUser();
  const tasks = await getTasks();

  return (
    <div
      className='
      h-full
      p-4
      flex
      lg:space-x-4
      bg-background_LM
      dark:bg-background_DM/90 
      text-text_LM
      dark:text-text_DM'>
      <MenuSidebar
        user={user}
        tasks={tasks}
      />
      <main className='w-full'>{children}</main>
      <TaskSidebar />
    </div>
  );
}

export default Sidebar;
