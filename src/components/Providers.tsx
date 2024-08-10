"use client";

import { PropsWithChildren } from "react"; // Import type for props with children
import { NextUIProvider } from "@nextui-org/react"; // Import the NextUIProvider component

// The Providers component is used to wrap the application with providers for NextUI
export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <NextUIProvider>
      {children} {/* Render children inside the NextUIProvider */}
    </NextUIProvider>
  );
};
