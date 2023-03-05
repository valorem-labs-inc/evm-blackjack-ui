import { Navbar } from "../components/Navbar";
import { PlayerActions } from "../components/PlayerActions/PlayerActions";
import { FullScene } from "../components/Scenes3D/FullScene";

const R3F = () => {
  console.log("");
  return (
    <>
      <Navbar />
      <FullScene />;
      <div className="absolute right-[5%] bottom-[5%] z-20">
        <PlayerActions />
      </div>
    </>
  );
};

export default R3F;
