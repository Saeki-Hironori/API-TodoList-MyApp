import React from "react";
import { NextApiHandler } from "next";
import prisma from "../../../../prisma/prisma";

const handleRequest: NextApiHandler = async (req, res) => {
  const { method } = req;

  switch (method) {
    // ------------------------------------------------------------
    case "GET":
      const { id } = req.query;

      const todo = await prisma.todo.findUnique({
        where: {
          id: Number(id),
        },
      });
      res.status(200).json({ todo, message: "GET request processed" });
      break;
    // ------------------------------------------------------------
    default:
      res.setHeader("Allow", ["POST", "GET", "PUT", "DELETE"]);
      res.status(405).json({ error: `Method ${method} Not Allowed` });
      break;
  }
};

export default handleRequest;
