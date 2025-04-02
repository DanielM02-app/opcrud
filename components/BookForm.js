import { useState, useEffect } from "react";

export default function BookForm({ onSubmit, editingBook }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    if (editingBook) {
      setTitle(editingBook.title);
      setAuthor(editingBook.author);
    }
  }, [editingBook]);

  return (
    <form
      className="book-form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ title, author });
        setTitle("");
        setAuthor("");
      }}
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título"
        required
      />
      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Autor"
        required
      />
      <button type="submit" className="submit-btn">
        {editingBook ? "Actualizar Libro" : "Agregar Libro"}
      </button>
    </form>
  );
}
