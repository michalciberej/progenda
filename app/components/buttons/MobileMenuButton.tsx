'use client';

import { useSidebarContext } from '@/app/context/SidebarContext';
import { RxHamburgerMenu } from 'react-icons/rx';

const MobileMenuButton = () => {
  const { setIsMenuOpened } = useSidebarContext();

  return (
    <button
      type='button'
      aria-label='Menu'
      onClick={() => setIsMenuOpened(true)}
      className='lg:hidden mr-4'>
      <RxHamburgerMenu />
    </button>
  );
};

export default MobileMenuButton;
