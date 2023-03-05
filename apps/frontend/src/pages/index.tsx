import Head from "next/head";
import { CardDecks } from "ui";
import { Navbar } from "../components/Navbar";
import { Table2D } from "../components/Table2D";

const Club2 = CardDecks.Flashy["2C"];
const Back1 = CardDecks.Flashy["1B"];
const Back2 = CardDecks.Flashy["2B"];

export default function App() {
  return (
    <>
      <Navbar />
      <Table2D />
    </>
  );
}
