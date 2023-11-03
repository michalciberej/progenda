'use client';

import { useContext, useState, createContext, useEffect } from 'react';

type ThemeContext = {
  isDarkTheme: boolean;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContext | null>(null);

export default function ThemeContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  useEffect(() => {
    initialThemeHandler();
  });

  const isLocalStorageEmpty = (): boolean => {
    return !localStorage.getItem('isDarkTheme');
  };
  const initialThemeHandler = () => {
    if (
      localStorage.isDarkTheme === 'dark' ||
      (!('isDarkTheme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      localStorage.setItem('isDarkTheme', 'true');
      document!.querySelector('body')!.classList.add('dark');
      setIsDarkTheme(true);
    }
    if (isLocalStorageEmpty()) {
      localStorage.setItem('isDarkTheme', 'true');
      document!.querySelector('body')!.classList.add('dark');
      setIsDarkTheme(true);
    } else {
      const isDarkTheme: boolean = JSON.parse(
        localStorage.getItem('isDarkTheme')!
      );
      isDarkTheme && document!.querySelector('body')!.classList.add('dark');
      setIsDarkTheme(() => {
        return isDarkTheme;
      });
    }
  };

  const toggleTheme = () => {
    const isDarkTheme: boolean = JSON.parse(
      localStorage.getItem('isDarkTheme')!
    );
    setIsDarkTheme(!isDarkTheme);
    toggleDarkClassToBody();
    setValueToLocalStorage();
  };

  const toggleDarkClassToBody = () => {
    document!.querySelector('body')!.classList.toggle('dark');
  };

  const setValueToLocalStorage = () => {
    localStorage.setItem('isDarkTheme', `${!isDarkTheme}`);
  };

  return (
    <ThemeContext.Provider
      value={{
        isDarkTheme,
        toggleTheme,
      }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      'useThemeContext must be used within ThemeContextProvider!'
    );
  }
  return context;
};
