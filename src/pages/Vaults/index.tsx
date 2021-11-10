import React from "react";
import { Box, Flex, Heading, Link, Text } from "theme-ui";
import { Vault } from "src/pages/Vaults/Vault";
import { vaults } from "src/config";

export const Vaults: React.FC = () => {
  return (
    <Flex
      sx={{
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Box mb={4}>
        <Heading as="h2">Vaults</Heading>
        <Text variant="regularGray">
          Lock{" "}
          <Link
            href="https://www.mobius.money/#/pool"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mobius LP tokens
          </Link>{" "}
          to get vault tokens. Vault tokens can be used to mint stabilUSD.
        </Text>
      </Box>
      <Flex sx={{ flexWrap: "wrap" }}>
        {vaults.map((vaultConfig, idx) => (
          <React.Fragment key={idx}>
            <Vault vaultConfig={vaultConfig} />
          </React.Fragment>
        ))}
      </Flex>
    </Flex>
  );
};
