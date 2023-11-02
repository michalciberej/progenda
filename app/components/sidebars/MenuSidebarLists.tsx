import { List } from '@prisma/client';

const MenuSidebarLists = ({
  lists,
  isMenuOpened,
}: {
  lists?: List[];
  isMenuOpened: boolean;
}) => {
  const hiddenOrShown = isMenuOpened ? 'block' : 'hidden';

  return (
    <section>
      <div className='flex flex-col py-4'>
        <h2 className={`font-semibold mb-1 ${hiddenOrShown}`}>Tasks</h2>
      </div>
    </section>
  );
};

export default MenuSidebarLists;
