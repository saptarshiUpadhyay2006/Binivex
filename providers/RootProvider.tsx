"use client";

import React, { ReactNode } from "react";
import { UIProvider } from "@/context/UIContext";

export const RootProvider = ({ children }: { children: ReactNode }) => {
  return (
    <UIProvider>
      {children}
    </UIProvider>
  );
};
