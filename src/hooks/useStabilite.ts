import { useContractKit } from "@celo-tools/use-contractkit";
import StabiliteAbi from "src/abis/Stabilite.json";
import ERC20Abi from "src/abis/ERC20.json";
import { Stabilite } from "src/generated/Stabilite";
import React from "react";
import { AbiItem, toWei } from "web3-utils";
import { useAsyncState } from "./useAsyncState";
import { ERC20 } from "src/generated/ERC20";
import { toastTx } from "src/utils/toastTx";
import { DEFAULT_GAS_PRICE } from "src/config";
import { MAX_UINT } from "src/constants";

export const useStabilite = (
  stabiliteAddress: string,
  vaultAddress: string
) => {
  const { kit, address, getConnectedKit } = useContractKit();

  const call = React.useCallback(async () => {
    const stabilite = new kit.web3.eth.Contract(
      StabiliteAbi as AbiItem[],
      stabiliteAddress
    ) as unknown as Stabilite;

    const stabiliteBalance = address
      ? await stabilite.methods.balanceOf(address).call()
      : null;

    const mint = async (amount: string) => {
      const kit = await getConnectedKit();
      if (!kit.defaultAccount) {
        alert("No account found. Try reconnecting your wallet");
        return;
      }
      const stabilite = new kit.web3.eth.Contract(
        StabiliteAbi as AbiItem[],
        stabiliteAddress
      ) as unknown as Stabilite;
      const tx = await stabilite.methods
        .mint(vaultAddress, toWei(amount), kit.defaultAccount)
        .send({ from: kit.defaultAccount, gasPrice: DEFAULT_GAS_PRICE });
      toastTx(tx.transactionHash);
    };

    const burn = async (amount: string) => {
      const kit = await getConnectedKit();
      if (!kit.defaultAccount) {
        alert("No account found. Try reconnecting your wallet");
        return;
      }
      const stabilite = new kit.web3.eth.Contract(
        StabiliteAbi as AbiItem[],
        stabiliteAddress
      ) as unknown as Stabilite;
      const tx = await stabilite.methods
        .burn(vaultAddress, toWei(amount), kit.defaultAccount)
        .send({ from: kit.defaultAccount, gasPrice: DEFAULT_GAS_PRICE });
      toastTx(tx.transactionHash);
    };

    const approve = async () => {
      const kit = await getConnectedKit();
      if (!kit.defaultAccount) {
        alert("No account found. Try reconnecting your wallet");
        return;
      }
      const vault = new kit.web3.eth.Contract(
        ERC20Abi as AbiItem[],
        vaultAddress
      ) as unknown as ERC20;
      const tx = await vault.methods
        .approve(stabiliteAddress, MAX_UINT)
        .send({ from: kit.defaultAccount, gasPrice: DEFAULT_GAS_PRICE });
      toastTx(tx.transactionHash);
    };

    const vault = new kit.web3.eth.Contract(
      ERC20Abi as AbiItem[],
      await vaultAddress
    ) as unknown as ERC20;

    const vaultAllowance = address
      ? await vault.methods.allowance(address, stabiliteAddress).call()
      : null;
    const vaultBalance = address
      ? await vault.methods.balanceOf(address).call()
      : null;

    return {
      stabiliteBalance,
      vaultAllowance,
      vaultBalance,
      mint,
      burn,
      approve,
    };
  }, [
    address,
    getConnectedKit,
    kit.web3.eth.Contract,
    stabiliteAddress,
    vaultAddress,
  ]);

  return useAsyncState(null, call);
};
