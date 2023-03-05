import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ethers } from "ethers";
import { useAccount, useContractRead } from "wagmi";
import { CHIP_ABI } from "../lib/abis/ABIs";
import { CHIP_ADDR } from "../lib/constants";

export const Wallet = () => {
  const { address } = useAccount();
  const { data } = useContractRead({
    abi: CHIP_ABI,
    address: CHIP_ADDR,
    functionName: "balanceOf",
    args: [
      address ?? (ethers.BigNumber.from(0).toHexString() as `0x${string}`),
    ],
    watch: true,
  });

  return (
    <div className="flex items-center">
      <p className="px-4 text-blue-900">
        {`${ethers.utils.formatEther(data ?? ethers.BigNumber.from(0))}`} $CHIP
      </p>
      <ConnectButton showBalance={false} />
    </div>
  );
};
