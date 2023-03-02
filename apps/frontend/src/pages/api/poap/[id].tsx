import type { NextApiRequest, NextApiResponse } from "next";

const links: string[] = JSON.parse(process.env.POAPLINKS!) as string[];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  console.log("redirecting tester to POAP Link");
  res.status(200).redirect(links[Number(id)]);
}
