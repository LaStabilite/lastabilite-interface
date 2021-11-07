import React from "react";
import { Button, Container, Flex } from "theme-ui";
import { useLocation, Link } from "react-router-dom";
import { WalletCard } from "src/components/Wallet/WalletCard";
import { LogoIcon } from "src/icons/LogoIcon";
import { Page } from "src/state/global";
import { ColorModeToggle } from "../ColorModeToggle";

const HeaderButton: React.FC<{ page: Page }> = ({ page, children }) => {
  const location = useLocation();
  return (
    <Link to={`/${page}`}>
      <Button
        variant={
          location.pathname.includes(page) ? "switcherSelected" : "switcher"
        }
      >
        {children}
      </Button>
    </Link>
  );
};

export const MobileHeader: React.FC = () => {
  return (
    <Container sx={{ width: "auto" }}>
      <Flex
        sx={{
          mb: 2,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <LogoIcon />
        <Flex>
          <ColorModeToggle />
          <WalletCard />
        </Flex>
      </Flex>
      <Flex
        sx={{
          justifyContent: "center",
          overflow: "scroll",
          width: "100%",
        }}
        mt={3}
      >
        <HeaderButton page={Page.VAULTS}>Vaults</HeaderButton>
        <HeaderButton page={Page.MINT}>Mint</HeaderButton>
        <HeaderButton page={Page.TREASURY}>Treasury</HeaderButton>
      </Flex>
    </Container>
  );
};
