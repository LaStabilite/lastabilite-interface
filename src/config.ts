import { toWei } from "web3-utils";

// MULTISIG that owns STABILITE_USD
export const MULTISIG = "0xebF7f27d0B03C519cc52Be35cD534064a0Ce2466";
export const MULTISIG_OWNERS = ["0xf1d10a171fF8C269882f132803c64e5dcC12875F"];
export const STABILITE_USD = "0x0a60c25Ef6021fC3B479914E6bcA7C03c18A97f1";

export const DEFAULT_GAS_PRICE = toWei("0.13", "gwei");

export type VaultConfig = {
  address: string;
  name: string;
  lockAssetAddress: string;
  lockAssetName: string;
};

export const vaults: VaultConfig[] = [
  {
    address: "0x7cFF0c64f92F125e10557339b15Cf11833B29328",
    name: "cUSD-asUSDC mobVAULT",
    lockAssetAddress: "0xAFEe90ab6A2D3B265262f94F6e437E7f6d94e26E",
    lockAssetName: "cUSD-asUSDC MobLP",
  },
  {
    address: "0x7047E61F3Aa4A1312252dD61a292143abC67F78f",
    name: "cUSD-cUSDC mobVAULT",
    lockAssetAddress: "0xd7Bf6946b740930c60131044bD2F08787e1DdBd4",
    lockAssetName: "cUSD-cUSDC MobLP",
  },
];
