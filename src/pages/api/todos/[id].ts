import type { NextApiHandler } from "next";
import prisma from "../../../../prisma/prisma";

const handleRequest: NextApiHandler = async (req, res) => {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    // ------------------------------------------------------------
    case "GET":
      const todos = await prisma.todo.findMany({
        where: {
          userId: String(id),
        },
        orderBy: {
          createdAt: "asc",
        },
      });
      res.status(200).json({ todos, message: "GET request processed" });
      break;
    // ------------------------------------------------------------
    case "POST":
      await prisma.todo.create({
        data: { ...req.body },
      });
      res.status(200).json({ message: "POST request processed" });
      break;
    // ------------------------------------------------------------
    case "PUT":
      break;
    // ------------------------------------------------------------
    case "DELETE":
      await prisma.todo.delete({
        where: {
          id: Number(id),
        },
      });
      res.status(200).json({ message: "DELETE request processed" });
      break;
    // ------------------------------------------------------------
    default:
      res.setHeader("Allow", ["POST", "GET", "PUT", "DELETE"]);
      res.status(405).json({ error: `Method ${method} Not Allowed` });
      break;
  }
};

export default handleRequest;
