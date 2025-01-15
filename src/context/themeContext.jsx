import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Retrieve the stored theme from localStorage or default to 'light'
  const storedTheme = localStorage.getItem("themeMode") || "light";
  const [themeMode, setThemeMode] = useState(storedTheme);

  // Switch theme and store in localStorage
  const switchTheme = (theme) => {
    setThemeMode(theme);
    document.documentElement.className = theme;
    localStorage.setItem("themeMode", theme); // Save theme in localStorage
  };

  useEffect(() => {
    // Apply the theme when the component mounts (in case it's refreshed)
    document.documentElement.className = themeMode;
  }, [themeMode]); // This runs when themeMode changes

  return (
    <ThemeContext.Provider value={{ themeMode, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
