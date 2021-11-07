import React from "react";
import { useLocation } from "react-router-dom";
import { Box, Container, Flex, Text } from "theme-ui";
import { Logo } from "src/components/Logo";
import { AccountProfile } from "src/components/AccountProfile";
import { StyledLink } from "src/components/StyledLink";
import { Page } from "src/state/global";

const HeaderLink: React.FC<{ page: Page }> = ({ page, children }) => {
  const location = useLocation();
  const selected = location.pathname.includes(page);
  return (
    <Box mr={3}>
      <StyledLink to={`/${page}`}>
        <Text
          sx={{
            color: selected ? "primary" : "text",
            borderBottom: selected ? "2px solid" : "none",
            mx: 1,
            pb: 1,
          }}
          variant="subtitle"
        >
          {children}
        </Text>
      </StyledLink>
    </Box>
  );
};

export const DesktopHeader: React.FC = () => {
  return (
    <>
      <Container sx={{ width: "auto" }}>
        <Flex
          sx={{
            mb: 2,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box mr={4}>
            <Logo />
          </Box>
          <Flex
            sx={{
              alignItems: "center",
            }}
          >
            <HeaderLink page={Page.VAULTS}>Vaults</HeaderLink>
            <HeaderLink page={Page.MINT}>Mint</HeaderLink>
            <HeaderLink page={Page.TREASURY}>Treasury</HeaderLink>
          </Flex>
          <AccountProfile />
        </Flex>
      </Container>
    </>
  );
};
