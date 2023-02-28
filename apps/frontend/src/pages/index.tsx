/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Head from "next/head";
// import { CardDecks } from "ui";
import { Navbar } from "../components/Navbar";
import Club2 from "../../public/card-styles/flashy/2C.svg";
import Back1 from "../../public/card-styles/flashy/1B.svg";
import Back2 from "../../public/card-styles/flashy/2B.svg";
import { Table2D } from "../components/Table2D";

export default function Store() {
  console.log({ Club2 });
  return (
    <div>
      <Head>
        <title>EVM Casino</title>
      </Head>
      <div className="flex flex-col w-screen h-screen">
        <Navbar />
        <Table2D>
          <Club2 />
          <Back1 />
          <Back2 />
        </Table2D>
        {/* <img src={Club2} alt="" /> */}
      </div>
    </div>
  );
}
