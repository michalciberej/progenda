'use client';

import { GiHamburgerMenu } from 'react-icons/gi';
import { Task, User } from '@prisma/client';
import { useSidebarContext } from '@/app/context/SidebarContext';
import { ListWithTaskCount } from '@/typings';
import clsx from 'clsx';

import MenuSidebarTasks from './MenuSidebarTasks';
import MenuSidebarLists from './MenuSidebarLists';
import MenuSidebarFooter from './MenuSidebarFooter';

const MenuSidebar = ({
  user,
  tasks,
  lists,
}: {
  user: User;
  tasks: Task[];
  lists: ListWithTaskCount[];
}) => {
  const { isMenuOpened, setIsMenuOpened } = useSidebarContext();

  return (
    <aside
      className={clsx(
        `
      hidden
      lg:flex
      flex-col
      w-full
      h-full
      p-4
      rounded-xl
      divide-y
      divide-background_DM/20
      dark:divide-background_LM/20
      bg-secondary_LM
      dark:bg-secondary_DM
      `,
        isMenuOpened ? 'lg:w-80' : 'lg:w-14'
      )}>
      <section>
        <div className='flex justify-between items-center pb-4'>
          {isMenuOpened && <h1 className='text-2xl font-semibold'>Menu</h1>}
          <button
            type='button'
            aria-label='menu'
            onClick={() => setIsMenuOpened(!isMenuOpened)}
            className='text-2xl'>
            <GiHamburgerMenu />
          </button>
        </div>
      </section>
      <MenuSidebarTasks
        tasks={tasks}
        isMenuOpened={isMenuOpened}
      />
      <MenuSidebarLists
        lists={lists}
        isMenuOpened={isMenuOpened}
      />
      <MenuSidebarFooter
        user={user}
        isMenuOpened={isMenuOpened}
      />
    </aside>
  );
};

export default MenuSidebar;
