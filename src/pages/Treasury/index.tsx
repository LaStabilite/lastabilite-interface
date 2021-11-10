import React from "react";
import { Box, Button, Flex, Heading } from "theme-ui";
import { useTreasury } from "src/hooks/useTreasury";
import { BlockText } from "src/components/BlockText";
import { humanFriendlyWei } from "src/utils/number";
import { useContractKit } from "@celo-tools/use-contractkit";
import { BlockscoutAddressLink } from "src/components/BlockscoutAddressLink";
import { MULTISIG_OWNERS, STABILITE_USD } from "src/config";

export const Treasury: React.FC = () => {
  const { address } = useContractKit();
  const [treasury, refetchTreasury] = useTreasury();

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
        <Heading as="h2">stabilUSD Total Supply</Heading>
        <BlockText variant="primary">
          {humanFriendlyWei(treasury?.totalStabiliteSupply.toString() ?? "0")}{" "}
          <BlockscoutAddressLink address={STABILITE_USD}>
            stabilUSD
          </BlockscoutAddressLink>
        </BlockText>
      </Box>
      <Box mb={4}>
        <Heading as="h2">Collateralization</Heading>
        {treasury?.vaultData.map((vd, idx) => (
          <Flex sx={{ alignItems: "center" }}>
            <BlockText key={idx} variant="primary">
              {humanFriendlyWei(vd.reserveSize.toString() ?? "0")}{" "}
              <BlockscoutAddressLink address={vd.vaultConfig.address}>
                {vd.vaultConfig.name}
              </BlockscoutAddressLink>
            </BlockText>
            {MULTISIG_OWNERS.includes(address || "") && (
              <Button
                sx={{ px: 2, py: 1, ml: 2 }}
                onClick={async () => {
                  vd.whitelisted ? await vd.ban() : await vd.whitelist();
                  refetchTreasury();
                }}
              >
                {vd.whitelisted ? "Ban" : "Whitelist"}
              </Button>
            )}
          </Flex>
        ))}
      </Box>
      <Box mb={4}>
        <Heading as="h2">Limits</Heading>
        {treasury?.vaultData.map((vd, idx) => (
          <Flex sx={{ alignItems: "center" }}>
            <BlockText key={idx} variant="primary">
              {humanFriendlyWei(vd.depositLimit.toString() ?? "0")}{" "}
              <BlockscoutAddressLink address={vd.vaultConfig.address}>
                {vd.vaultConfig.name}
              </BlockscoutAddressLink>
            </BlockText>
            {MULTISIG_OWNERS.includes(address || "") && (
              <Button
                sx={{ px: 2, py: 1, ml: 2 }}
                onClick={async () => {
                  await vd.setDepositLimit();
                  refetchTreasury();
                }}
              >
                Increase
              </Button>
            )}
          </Flex>
        ))}
      </Box>
    </Flex>
  );
};
