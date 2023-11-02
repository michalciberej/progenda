'use client';

import { useContext, useState, createContext, SetStateAction } from 'react';

type SidebarContext = {
  isMenuOpened: boolean;
  setIsMenuOpened: React.Dispatch<SetStateAction<boolean>>;
  isTaskOpened: boolean;
  setIsTaskOpened: React.Dispatch<SetStateAction<boolean>>;
};

export const SidebarContext = createContext<SidebarContext | null>(null);

export default function SidebarContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [isTaskOpened, setIsTaskOpened] = useState(false);

  return (
    <SidebarContext.Provider
      value={{
        isMenuOpened,
        setIsMenuOpened,
        isTaskOpened,
        setIsTaskOpened,
      }}>
      {children}
    </SidebarContext.Provider>
  );
}

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error(
      'useSidebarContext must be used within SidebarContextProvider!'
    );
  }
  return context;
};
