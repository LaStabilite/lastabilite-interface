import React from "react";
import { MobileHeader } from "src/components/Header/MobileHeader";
import { DesktopHeader } from "src/components/Header/DesktopHeader";
import { Breakpoint, useBreakpoint } from "src/hooks/useBreakpoint";

export const Header: React.FC = () => {
  const breakpoint = useBreakpoint();

  if (breakpoint === Breakpoint.MOBILE) {
    return <MobileHeader />;
  }

  return <DesktopHeader />;
};
