import { createContext, ReactNode, useState } from "react";

const ThemeContext = createContext({
  theme: "light",
  toggleMode: () => {},
});

interface ThemeProps {
  children: ReactNode;
}
// Provider 생성
export const ThemeContextProvider = ({ children }: ThemeProps) => {
  const [theme, setTheme] = useState(
    window.localStorage.getItem("theme") || "light"
  );

  const toggleMode = () => {
    // 이전 값을 받아서 이전 값이 ltght 였으면 dark 모드로 변경하고 아니면 light
    setTheme((prev) => {
      const newTheme = prev === "light" ? "dark" : "light";
      window.localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
