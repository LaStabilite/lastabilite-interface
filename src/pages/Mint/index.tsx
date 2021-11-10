import React from "react";
import { Switcher } from "src/components/Switcher";
import { STABILITE_USD, VaultConfig, vaults } from "src/config";
import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  Input,
  Link,
  Text,
} from "theme-ui";
import { fromWei, toBN, toWei } from "web3-utils";
import { useStabilite } from "src/hooks/useStabilite";
import { humanFriendlyNumber } from "src/utils/number";
import { useContractKit } from "@celo-tools/use-contractkit";

export const Mint: React.FC = () => {
  const { connect, address } = useContractKit();
  const [minting, setMinting] = React.useState(true);
  const [amount, setAmount] = React.useState("0");
  const [vault] = React.useState<VaultConfig>(vaults[0]!);
  const [stabilite, refetchStabilite] = useStabilite(
    STABILITE_USD,
    vault.address
  );

  const validAmount = !(
    isNaN(Number(amount)) ||
    Number(amount) < 0 ||
    amount === ""
  );
  const needsApproval = validAmount
    ? toBN(stabilite?.vaultAllowance ?? "0").lt(toBN(toWei(amount)))
    : true;

  const max = minting
    ? Number(fromWei(stabilite?.vaultBalance ?? "0"))
    : Number(fromWei(stabilite?.stabiliteBalance ?? "0"));

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
        <Heading as="h2">Mint stabilUSD</Heading>
        <Text variant="regularGray">
          Use vault tokens to mint stabilUSD. stabilUSD can be used to farm on{" "}
          <Link
            href="https://app.ubeswap.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ubeswap
          </Link>
          .
        </Text>
      </Box>
      <Card
        sx={{
          width: "500px",
          py: 4,
          px: 6,
          maxWidth: "100%",
          textAlign: "center",
        }}
      >
        <Flex
          sx={{
            alignItems: "center",
            justifyContent: "center",
            mb: 4,
          }}
        >
          <Switcher
            sx={{
              border: "4px solid var(--theme-ui-colors-primary)",
              borderRight: "none",
              borderRadius: "6px 0px 0px 6px",
            }}
            selected={minting}
            onClick={() => setMinting(true)}
          >
            Mint
          </Switcher>
          <Switcher
            sx={{
              border: "4px solid var(--theme-ui-colors-primary)",
              borderLeft: "none",
              borderRadius: "0px 6px 6px 0px",
            }}
            selected={!minting}
            onClick={() => setMinting(false)}
          >
            Burn
          </Switcher>
        </Flex>
        <Flex
          sx={{
            justifyContent: "space-between",
            alignItems: "baseline",
            mb: 1,
          }}
        >
          <Text variant="form">Amount</Text>
          <Text variant="form">
            <Link onClick={() => setAmount(max.toString())}>
              max: {humanFriendlyNumber(max)}
            </Link>
          </Text>
        </Flex>
        <Input
          mb={4}
          placeholder="Enter an amount"
          onChange={(e) => {
            setAmount(e.target.value);
          }}
          value={amount}
        />
        {address ? (
          needsApproval ? (
            <Button
              sx={{ width: "100%" }}
              onClick={() => {
                stabilite?.approve().then(refetchStabilite);
              }}
            >
              Approve
            </Button>
          ) : (
            <Button
              disabled={isNaN(Number(amount)) || Number(amount) <= 0}
              sx={{ width: "100%" }}
              onClick={() => {
                minting
                  ? stabilite?.mint(amount).then(refetchStabilite)
                  : stabilite?.burn(amount).then(refetchStabilite);
              }}
            >
              {minting ? "Mint" : "Burn"}
            </Button>
          )
        ) : (
          <Button
            sx={{ width: "100%" }}
            onClick={() => connect().catch(console.warn)}
          >
            Connect Wallet
          </Button>
        )}
        {validAmount && (
          <Grid columns={[2, "1fr auto"]} mt={4}>
            <Text sx={{ textAlign: "left" }}>You will receive</Text>
            <Text sx={{ textAlign: "right" }}>
              {humanFriendlyNumber(Number(amount))}{" "}
              {minting ? "stabilUSD" : vault.name}
            </Text>
            <Text sx={{ textAlign: "left" }}>Exchange rate</Text>
            <Text sx={{ textAlign: "right", maxWidth: "12em" }}>
              1 stabilUSD = 1 {vault.name}
            </Text>
          </Grid>
        )}
      </Card>
    </Flex>
  );
};
