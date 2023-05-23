import type { NextApiHandler } from "next";
import prisma from "../../../prisma/prisma";

const handler: NextApiHandler = async (req, res) => {
  try {
    await prisma.todo.create({ data: { ...req.body } });
    res.status(200).send("ok");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export default handler;
