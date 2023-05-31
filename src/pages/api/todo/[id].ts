import type { NextApiHandler } from "next";
import prisma from "../../../../prisma/prisma";

const handleRequest: NextApiHandler = async (req, res) => {
  const { method } = req;
  const { id } = req.query;
  const { status, title, detail } = req.body;

  switch (method) {
    // ------------------------------------------------------------
    case "GET":
      const getTodo = await prisma.todo.findUnique({
        where: {
          id: Number(id),
        },
      });
      res.status(200).json({ getTodo, message: "GET request processed" });
      break;
    // ------------------------------------------------------------
    case "PUT":
      const updateTodo = await prisma.todo.update({
        where: {
          id: Number(id),
        },
        data: {
          status: status,
          title: title,
          detail: detail,
        },
      });
      res.status(200).json({ updateTodo, message: "UPDATE request processed" });
      break;
    // ------------------------------------------------------------
    default:
      res.setHeader("Allow", ["POST", "GET", "PUT", "DELETE"]);
      res.status(405).json({ error: `Method ${method} Not Allowed` });
      break;
  }
};

export default handleRequest;
