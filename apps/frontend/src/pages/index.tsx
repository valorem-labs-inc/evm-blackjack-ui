import { ClaimChip } from "../components/ClaimChip";
import { Navbar } from "../components/Navbar";
import { Payouts } from "../components/Payouts";
import { PlayerActions } from "../components/PlayerActions/PlayerActions";
import { FullScene } from "../components/Scenes3D/FullScene";

const R3F = () => (
  <>
    <Navbar />
    <FullScene />;
    <Payouts />
    <ClaimChip />
    <div className="absolute right-[5%] bottom-[5%] z-20">
      <PlayerActions />
    </div>
  </>
);

export default R3F;
