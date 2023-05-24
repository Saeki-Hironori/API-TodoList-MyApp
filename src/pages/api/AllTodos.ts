// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/prisma";

const allTodos = async (req: NextApiRequest, res: NextApiResponse) => {
  const todos = await prisma.todo.findMany();
  res.status(200).json({ todos });
};

export default allTodos;