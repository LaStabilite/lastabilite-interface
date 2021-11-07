import { toWei } from "web3-utils";

export const STABILITE_USD = "0x9ef8756633414f648ba8597C3FcD5f02b45DcCA2";

export const DEFAULT_GAS_PRICE = toWei("0.13", "gwei");

export type VaultConfig = {
  address: string;
  name: string;
  lockAssetAddress: string;
  lockAssetName: string;
};

export const vaults: VaultConfig[] = [
  {
    address: "0x7047E61F3Aa4A1312252dD61a292143abC67F78f",
    name: "cUSD-USDC mobVAULT",
    lockAssetAddress: "0xd7Bf6946b740930c60131044bD2F08787e1DdBd4",
    lockAssetName: "cUSD-USDC MobLP",
  },
];
