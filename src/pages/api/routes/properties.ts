import { RouteProperties } from "@/common-types";
import type { NextApiRequest, NextApiResponse } from "next";

import { promises as fs } from "fs";
import path from "path";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const jsonDirectory = path.join(process.cwd(), "data");
  //Read the json data file data.json
  const fileContents = await fs.readFile(
    jsonDirectory + "/routes/routes.json",
    "utf8"
  );

  //Return the content of the data file in json format
  res.status(200).json(JSON.parse(fileContents));
}
