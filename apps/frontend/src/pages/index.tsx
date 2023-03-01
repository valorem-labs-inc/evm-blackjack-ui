import Head from "next/head";
import { CardDecks } from "ui";
import { Navbar } from "../components/Navbar";
import { Table2D } from "../components/Table2D";

const Club2 = CardDecks.Flashy["2C"];
const Back1 = CardDecks.Flashy["1B"];
const Back2 = CardDecks.Flashy["2B"];

export default function Store() {
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
      </div>
    </div>
  );
}
