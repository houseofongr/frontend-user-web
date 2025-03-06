import { createContext, useContext, useState } from "react";

interface MenuContextType {
  isOpen: boolean;
  toggleMenu: () => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export function MenuProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);

  return <MenuContext.Provider value={{ isOpen, toggleMenu }}>{children}</MenuContext.Provider>;
}

export function useMenu() {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
}
