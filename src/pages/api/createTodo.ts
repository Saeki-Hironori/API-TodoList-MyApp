import type { NextApiHandler } from "next";
import prisma from "../../../prisma/prisma";

const date = new Date(2023, 5, 24);

const createTodos: NextApiHandler = async (req, res) => {
  try {
    await prisma.todo.create({
      data: {
        ...req.body,
        // data: {
        //   uid: "clhylvlj70000a2xs3pkz80g0",
        //   id: "1",
        //   title: "テスト",
        //   createdAt: date,
        // },
      },
    });
    res.status(200).send("ok");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export default createTodos;
