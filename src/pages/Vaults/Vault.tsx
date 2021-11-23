import React from "react";
import { Card, Flex, Text, Link, Input, Button, Heading, Grid } from "theme-ui";
import { Switcher } from "src/components/Switcher";
import { humanFriendlyNumber } from "src/utils/number";
import { useVault } from "src/hooks/useVault";
import { fromWei, toBN, toWei } from "web3-utils";
import { useContractKit } from "@celo-tools/use-contractkit";
import { VaultConfig } from "src/config";

interface Props {
  vaultConfig: VaultConfig;
}

export const Vault: React.FC<Props> = ({ vaultConfig }) => {
  const { connect, address } = useContractKit();
  const [locking, setLocking] = React.useState(true);
  const [amount, setAmount] = React.useState("0");
  const [vault, refetchVault] = useVault(vaultConfig);

  const max = locking
    ? fromWei(vault?.lpTokenBalance ?? "0")
    : fromWei(vault?.vaultBalance ?? "0");

  const validAmount = !(
    isNaN(Number(amount)) ||
    Number(amount) < 0 ||
    amount === ""
  );

  const needsApproval = validAmount
    ? toBN(vault?.lpTokenAllowance ?? "0").lt(toBN(toWei(amount)))
    : true;

  return (
    <Card
      sx={{
        py: 4,
        px: 6,
        maxWidth: "100%",
        textAlign: "center",
      }}
    >
      <Heading as="h2" mb={4}>
        {vaultConfig.name}
      </Heading>
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
          selected={locking}
          onClick={() => setLocking(true)}
        >
          Lock
        </Switcher>
        <Switcher
          sx={{
            border: "4px solid var(--theme-ui-colors-primary)",
            borderLeft: "none",
            borderRadius: "0px 6px 6px 0px",
          }}
          selected={!locking}
          onClick={() => setLocking(false)}
        >
          Unlock
        </Switcher>
      </Flex>
      <Flex
        sx={{ justifyContent: "space-between", alignItems: "baseline", mb: 1 }}
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
              vault?.approve().then(refetchVault);
            }}
          >
            Approve
          </Button>
        ) : (
          <Button
            disabled={isNaN(Number(amount)) || Number(amount) <= 0}
            sx={{ width: "100%" }}
            onClick={() => {
              locking
                ? vault?.lock(amount).then(refetchVault)
                : vault?.unlock(amount).then(refetchVault);
            }}
          >
            {locking ? "Lock" : "Unlock"}
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
      {vault?.virtualPrice && validAmount && (
        <Grid columns={[2, "1fr auto"]} mt={4}>
          <Text sx={{ textAlign: "left" }}>You will receive</Text>
          <Text sx={{ textAlign: "right" }}>
            {humanFriendlyNumber(
              Number(amount) * Number(fromWei(vault.virtualPrice))
            )}{" "}
            {locking ? "mobVAULT" : vaultConfig.lockAssetName}
          </Text>
          <Text sx={{ textAlign: "left" }}>Exchange rate</Text>
          <Text sx={{ textAlign: "right", maxWidth: "12em" }}>
            1 {vaultConfig.lockAssetName} ={" "}
            {Number(fromWei(vault.virtualPrice)).toLocaleString()} mobVAULT
          </Text>
        </Grid>
      )}
    </Card>
  );
};
