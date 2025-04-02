import { useEffect, useState } from "react";
import BookForm from "../components/BookForm";
import "../styles/globals.css"; // Asegúrate de importar el CSS global

export default function Home() {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const res = await fetch("/api/books");
    const data = await res.json();
    setBooks(data);
  };

  const handleAddBook = async (book) => {
    await fetch("/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });
    fetchBooks();
  };

  const handleUpdate = async (book) => {
    if (!editingBook) return;
    await fetch(`/api/books/${editingBook.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });
    setEditingBook(null);
    fetchBooks();
  };

  const handleDelete = async (id) => {
    const res = await fetch(`/api/books/${id}`, { method: "DELETE" });
    if (res.ok) {
      fetchBooks();
    } else {
      console.error("Error al borrar el libro");
    }
  };

  return (
    <div className="container">
      <h1>Gestión de Libros</h1>
      <BookForm onSubmit={editingBook ? handleUpdate : handleAddBook} editingBook={editingBook} />
      
      <div className="book-list">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <h2>{book.title}</h2>
            <p>{book.author}</p>
            <div className="buttons">
              <button className="edit-btn" onClick={() => setEditingBook(book)}>Editar</button>
              <button className="delete-btn" onClick={() => handleDelete(book.id)}>Borrar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
