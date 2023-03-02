import type { NextApiRequest, NextApiResponse } from "next";

const links: string[] = JSON.parse(process.env.POAPLINKS!) as string[];

// eslint-disable-next-line import/no-default-export
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req;
  console.log("redirecting tester to POAP Link");
  res.status(200).redirect(links[Number(query.studyId ?? Date.now()) % 149]);
}
