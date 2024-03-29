import type { FC, ReactNode } from 'react';
import { createContext, useState } from 'react';

type ThemeContextType = {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => null,
});

type Props = {
  children: ReactNode;
};

export const ThemeProvider: FC<Props> = ({ children }) => {
  const storedTheme = localStorage.getItem('theme');
  const currentTheme = storedTheme ? (storedTheme as 'dark' | 'light') : 'dark';

  const [theme, setTheme] = useState(currentTheme);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <main className={`${theme} text-foreground bg-background`}>
        {children}
      </main>
    </ThemeContext.Provider>
  );
};
