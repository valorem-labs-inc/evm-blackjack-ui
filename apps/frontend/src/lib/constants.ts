const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
const EVM_BLACKJACK_ADDR_SEPOLIA = "0x86a695c4B194588EE262c5822749Af18e0Eec984";
const EVM_BLACKJACK_ADDR_MUMBAI = "0x485F71d1914529fDbe5E74d72754DEba7d4a2812";
const CHIP_ADDR_SEPOLIA = "0x03bCFF97064102dc237651dC5F4C957A00Fd3390";
const CHIP_ADDR_MUMBAI = "0x77C571163668BA3Dd36D30577A3a76836586bdAB";

export const ADDRESSES_BY_NETWORK = {
  11155111: {
    BJ: EVM_BLACKJACK_ADDR_SEPOLIA,
    CHIP: CHIP_ADDR_SEPOLIA,
  },

  80001: {
    BJ: EVM_BLACKJACK_ADDR_MUMBAI,
    CHIP: CHIP_ADDR_MUMBAI,
  },
};
