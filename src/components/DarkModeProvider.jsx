import React, { createContext, useContext, useState, useEffect } from 'react';

const DarkModeContext = createContext(false);

export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const darkmodeCSS = "dark text-foreground bg-background"

  useEffect(() => {
    if (isDarkMode) {
      darkmodeCSS.split(" ").forEach(css => 
        document.documentElement.classList.add(css)
      )
    } else {
      darkmodeCSS.split(" ").forEach(css => 
        document.documentElement.classList.remove(css)
      )
    }
  }, [isDarkMode]);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  return [context.isDarkMode, context.setIsDarkMode];
};