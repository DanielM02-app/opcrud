import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default async function handler(req, res) {
    if (req.method === "GET") {
        const books = await prisma.book.findMany();
        res.status(200).json(books);
    }

    if (req.method === "POST") {
        const { title, author } = req.body;
        const newBook = await prisma.book.create({ data: { title, author } });
        res.status(201).json(newBook);
    }
}