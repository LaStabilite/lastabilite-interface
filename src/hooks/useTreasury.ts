import { useContractKit } from "@celo-tools/use-contractkit";
import MobiusVaultAbi from "src/abis/MobiusVault.json";
import StabiliteAbi from "src/abis/Stabilite.json";
import { MobiusVault } from "src/generated/MobiusVault";
import { Stabilite } from "src/generated/Stabilite";
import React from "react";
import { AbiItem, toWei } from "web3-utils";
import { useAsyncState } from "./useAsyncState";
import {
  STABILITE_USD,
  vaults,
  VaultConfig,
  DEFAULT_GAS_PRICE,
} from "src/config";
import { toastTx } from "src/utils/toastTx";

export const useTreasury = () => {
  const { kit, getConnectedKit } = useContractKit();

  const call = React.useCallback(async () => {
    const stabilite = new kit.web3.eth.Contract(
      StabiliteAbi as AbiItem[],
      STABILITE_USD
    ) as unknown as Stabilite;

    const totalStabiliteSupply = await stabilite.methods.totalSupply().call();
    const owner = await stabilite.methods.owner().call();

    const vaultData: {
      vaultConfig: VaultConfig;
      depositLimit: string;
      reserveSize: string;
      whitelisted: boolean;
      setDepositLimit: () => Promise<void>;
      whitelist: () => Promise<void>;
      ban: () => Promise<void>;
    }[] = [];

    for (let vaultConfig of vaults) {
      const vault = new kit.web3.eth.Contract(
        MobiusVaultAbi as AbiItem[],
        vaultConfig.address
      ) as unknown as MobiusVault;

      const depositLimit = await stabilite.methods
        .depositLimits(vaultConfig.address)
        .call();
      const reserveSize = await vault.methods.balanceOf(STABILITE_USD).call();
      const whitelisted = await stabilite.methods
        .vaults(vaultConfig.address)
        .call();
      const setDepositLimit = async () => {
        const newLimit = prompt("Enter a new limit");
        if (
          !newLimit ||
          isNaN(Number(newLimit)) ||
          Number(newLimit) < 0 ||
          newLimit === ""
        ) {
          alert("Invalid new limit");
          return;
        }
        const kit = await getConnectedKit();
        const stabilite = new kit.web3.eth.Contract(
          StabiliteAbi as AbiItem[],
          STABILITE_USD
        ) as unknown as Stabilite;
        const tx = await stabilite.methods
          .setDepositLimit(vaultConfig.address, toWei(newLimit))
          .send({ from: kit.defaultAccount, gasPrice: DEFAULT_GAS_PRICE });
        toastTx(tx.transactionHash);
      };
      const whitelist = async () => {
        const kit = await getConnectedKit();
        const stabilite = new kit.web3.eth.Contract(
          StabiliteAbi as AbiItem[],
          STABILITE_USD
        ) as unknown as Stabilite;
        const tx = await stabilite.methods
          .whitelistVault(vaultConfig.address)
          .send({ from: kit.defaultAccount, gasPrice: DEFAULT_GAS_PRICE });
        toastTx(tx.transactionHash);
      };
      const ban = async () => {
        const kit = await getConnectedKit();
        const stabilite = new kit.web3.eth.Contract(
          StabiliteAbi as AbiItem[],
          STABILITE_USD
        ) as unknown as Stabilite;
        const tx = await stabilite.methods
          .banVault(vaultConfig.address)
          .send({ from: kit.defaultAccount, gasPrice: DEFAULT_GAS_PRICE });
        toastTx(tx.transactionHash);
      };

      vaultData.push({
        vaultConfig,
        depositLimit,
        reserveSize,
        setDepositLimit,
        whitelisted,
        whitelist,
        ban,
      });
    }

    return {
      totalStabiliteSupply,
      owner,
      vaultData,
    };
  }, [getConnectedKit, kit.web3.eth.Contract]);

  return useAsyncState(null, call);
};
