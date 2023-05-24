// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import React from "react";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/prisma";
import { useSession } from "next-auth/react";

const { data: session, status } = useSession();

const allTodos = async (req: NextApiRequest, res: NextApiResponse) => {
  const todos = await prisma.todo.findMany({
    where: {
      userId: "clhzvo75s0008a2gclry43ip2",
    },
  });
  res.status(200).json({ todos });
};

export default allTodos;
