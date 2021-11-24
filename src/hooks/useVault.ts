import { useContractKit } from "@celo-tools/use-contractkit";
import MobiusVaultAbi from "src/abis/MobiusVault.json";
import ERC20Abi from "src/abis/ERC20.json";
import MobiusSwapAbi from "src/abis/MobiusSwap.json";
import { MobiusVault } from "src/generated/MobiusVault";
import { MobiusSwap } from "src/generated/MobiusSwap";
import React from "react";
import { AbiItem, toWei } from "web3-utils";
import { useAsyncState } from "./useAsyncState";
import { ERC20 } from "src/generated/ERC20";
import { toastTx } from "src/utils/toastTx";
import { DEFAULT_GAS_PRICE, VaultConfig } from "src/config";
import { MAX_UINT } from "src/constants";

export const useVault = (vaultConfig: VaultConfig) => {
  const { kit, address, getConnectedKit } = useContractKit();

  const call = React.useCallback(async () => {
    const vault = new kit.web3.eth.Contract(
      MobiusVaultAbi as AbiItem[],
      vaultConfig.address
    ) as unknown as MobiusVault;

    const vaultBalance = address
      ? await vault.methods.balanceOf(address).call()
      : null;

    const lock = async (amount: string) => {
      const kit = await getConnectedKit();
      if (!kit.defaultAccount) {
        alert("No account found. Try reconnecting your wallet");
        return;
      }
      const vault = new kit.web3.eth.Contract(
        MobiusVaultAbi as AbiItem[],
        vaultConfig.address
      ) as unknown as MobiusVault;
      const tx = await vault.methods
        .deposit(toWei(amount), kit.defaultAccount)
        .send({ from: kit.defaultAccount, gasPrice: DEFAULT_GAS_PRICE });
      toastTx(tx.transactionHash);
    };

    const unlock = async (amount: string) => {
      const kit = await getConnectedKit();
      if (!kit.defaultAccount) {
        alert("No account found. Try reconnecting your wallet");
        return;
      }
      const vault = new kit.web3.eth.Contract(
        MobiusVaultAbi as AbiItem[],
        vaultConfig.address
      ) as unknown as MobiusVault;
      const tx = await vault.methods
        .withdraw(toWei(amount), kit.defaultAccount)
        .send({ from: kit.defaultAccount, gasPrice: DEFAULT_GAS_PRICE });
      toastTx(tx.transactionHash);
    };

    const stakeToken = new kit.web3.eth.Contract(
      ERC20Abi as AbiItem[],
      vaultConfig.lockAssetAddress
    ) as unknown as ERC20;

    const approve = async () => {
      const kit = await getConnectedKit();
      if (!kit.defaultAccount) {
        alert("No account found. Try reconnecting your wallet");
        return;
      }
      const stakeToken = new kit.web3.eth.Contract(
        ERC20Abi as AbiItem[],
        vaultConfig.lockAssetAddress
      ) as unknown as ERC20;
      const tx = await stakeToken.methods
        .approve(vaultConfig.address, MAX_UINT)
        .send({ from: kit.defaultAccount, gasPrice: DEFAULT_GAS_PRICE });
      toastTx(tx.transactionHash);
    };

    const stakeTokenAllowance = address
      ? await stakeToken.methods.allowance(address, vaultConfig.address).call()
      : null;
    const stakeTokenBalance = address
      ? await stakeToken.methods.balanceOf(address).call()
      : null;

    let virtualPrice = toWei("1");
    try {
      const lpSwap = new kit.web3.eth.Contract(
        MobiusSwapAbi as AbiItem[],
        await vault.methods.lpSwap().call()
      ) as unknown as MobiusSwap;

      virtualPrice = await lpSwap.methods.getVirtualPrice().call();
    } catch (e) {}

    return {
      vaultBalance,
      stakeTokenBalance,
      stakeTokenAllowance,
      virtualPrice,
      lock,
      unlock,
      approve,
    };
  }, [
    address,
    getConnectedKit,
    kit.web3.eth.Contract,
    vaultConfig.address,
    vaultConfig.lockAssetAddress,
  ]);

  return useAsyncState(null, call);
};
