import { useEffect, useState } from "react";
import BookForm from "../components/BookForm";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  // Función para obtener los libros actualizados
  const fetchBooks = async () => {
    const res = await fetch("/api/books");
    const data = await res.json();
    setBooks(data);
  };

  // Agregar un nuevo libro
  const handleAddBook = async (book) => {
    await fetch("/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });
    fetchBooks();
  };

  // Función para editar un libro
  const handleUpdate = async (book) => {
    if (!editingBook) return;
    await fetch(`/api/books/${editingBook.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });
    setEditingBook(null); // Salir del modo edición
    fetchBooks();
  };

  // Función para borrar un libro
  const handleDelete = async (id) => {
    const res = await fetch(`/api/books/${id}`, { method: "DELETE" });
    if (res.ok) {
      fetchBooks(); // Recargar los libros después de borrar
    } else {
      console.error("Error al borrar el libro");
    }
  };

  return (
    <div>
      <h1>Libros</h1>
      <BookForm
        onSubmit={editingBook ? handleUpdate : handleAddBook}
        initialData={editingBook}
      />
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} by {book.author}{" "}
            <button onClick={() => setEditingBook(book)}>Editar</button>
            <button onClick={() => handleDelete(book.id)}>Borrar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
