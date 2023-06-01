import type { NextApiHandler } from "next";
import prisma from "../../../../prisma/prisma";

const handleRequest: NextApiHandler = async (req, res) => {
  const { method } = req;
  const { id, name, email, image } = req.body;

  switch (method) {
    // ------------------------------------------------------------
    case "GET":
      break;
    // ------------------------------------------------------------
    case "POST":
      await prisma.user.create({ data: { ...req.body } });
      res.status(200).json({ message: "POST request processed" });
      break;
    // ------------------------------------------------------------
    default:
      res.setHeader("Allow", ["POST", "GET", "PUT", "DELETE"]);
      res.status(405).json({ error: `Method ${method} Not Allowed` });
      break;
  }
};

export default handleRequest;
