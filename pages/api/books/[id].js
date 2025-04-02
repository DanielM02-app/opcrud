import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { id } = req.query;

    if (!id || isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID" });
    }

    if (req.method === "PUT") {
        const { title, author } = req.body;
        try {
            const updatedBook = await prisma.book.update({
                where: { id: parseInt(id) },
                data: { title, author },
            });
            return res.status(200).json(updatedBook);
        } catch (error) {
            return res.status(500).json({ error: "Book not found" });
        }
    }

    if (req.method === "DELETE") {
        try {
            await prisma.book.delete({ where: { id: parseInt(id) } });
            return res.status(204).end();
        } catch (error) {
            return res.status(500).json({ error: "Book not found" });
        }
    }

    res.setHeader("Allow", ["PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
}