"use client";

import React from "react";
import StoreProvider from "./StoreProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <StoreProvider>{children}</StoreProvider>
    </div>
  );
};

export default Providers;
