import { Card, Flex, Text } from "theme-ui";
import { Wallet } from "phosphor-react";
import { useContractKit } from "@celo-tools/use-contractkit";
import { useRecoilState } from "recoil";
import { walletDrawerOpen } from "src/components/Wallet/WalletDrawer";
import { shortenAddress } from "src/utils/address";

export const WalletCard: React.FC = () => {
  const { address, connect } = useContractKit();
  const [walletDrawerIsOpen, setWalletDrawerIsOpen] =
    useRecoilState(walletDrawerOpen);

  return (
    <Card
      variant="warning"
      onClick={() => {
        if (!address) {
          connect().then(console.warn);
          return;
        }
        setWalletDrawerIsOpen(!walletDrawerIsOpen);
      }}
    >
      <Flex sx={{ alignItems: "center" }}>
        <Wallet size={32} />
        <Text variant="primary" ml={2} mt={1}>
          {address ? shortenAddress(address) : "Connect Wallet"}
        </Text>
      </Flex>
    </Card>
  );
};
