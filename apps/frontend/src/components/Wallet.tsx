/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ethers } from "ethers";
import { useAccount, useContractRead, useNetwork } from "wagmi";
import { CHIP_ABI } from "../lib/abis/ABIs";
import { ADDRESSES_BY_NETWORK } from "../lib/constants";

export const Wallet = () => {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { data } = useContractRead({
    abi: CHIP_ABI,
    address: ADDRESSES_BY_NETWORK?.[chain?.id]?.CHIP,
    functionName: "balanceOf",
    args: [
      address ?? (ethers.BigNumber.from(0).toHexString() as `0x${string}`),
    ],
    watch: true,
  });

  return (
    <div className="flex items-center">
      <p className="px-4 text-black">
        {`${ethers.utils.formatEther(data ?? ethers.BigNumber.from(0))}`} $CHIP
      </p>
      <ConnectButton showBalance={false} />
    </div>
  );
};
