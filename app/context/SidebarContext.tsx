'use client';

import { useContext, useState, createContext, SetStateAction } from 'react';
import { TaskToUpdate } from '@/typings';
import { List } from '@prisma/client';

type TaskVariant = 'CREATE' | 'UPDATE';

type SidebarContext = {
  isMenuOpened: boolean;
  setIsMenuOpened: React.Dispatch<SetStateAction<boolean>>;
  isTaskOpened: boolean;
  setIsTaskOpened: React.Dispatch<SetStateAction<boolean>>;
  taskToUpdate: TaskToUpdate;
  setTaskToUpdate: React.Dispatch<SetStateAction<TaskToUpdate>>;
  taskVariant: TaskVariant;
  setTaskVariant: React.Dispatch<SetStateAction<TaskVariant>>;
};

export const SidebarContext = createContext<SidebarContext | null>(null);

export default function SidebarContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [isTaskOpened, setIsTaskOpened] = useState(false);
  const [taskVariant, setTaskVariant] = useState<TaskVariant>('CREATE');
  const [taskToUpdate, setTaskToUpdate] = useState<TaskToUpdate>({
    title: '',
    body: '',
    date: '',
    list: { title: '', color: '', id: '', userId: '' },
  });

  return (
    <SidebarContext.Provider
      value={{
        isMenuOpened,
        setIsMenuOpened,
        isTaskOpened,
        setIsTaskOpened,
        taskToUpdate,
        setTaskToUpdate,
        taskVariant,
        setTaskVariant,
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
