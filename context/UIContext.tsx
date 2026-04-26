"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface UIContextType {
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  openSearch: () => void;
  isTutorialOpen: boolean;
  setIsTutorialOpen: (open: boolean) => void;
  openTutorial: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);

  const openSearch = () => setIsSearchOpen(true);
  const openTutorial = () => setIsTutorialOpen(true);

  return (
    <UIContext.Provider
      value={{
        isSearchOpen,
        setIsSearchOpen,
        openSearch,
        isTutorialOpen,
        setIsTutorialOpen,
        openTutorial,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error("useUI must be used within a UIProvider");
  }
  return context;
};
