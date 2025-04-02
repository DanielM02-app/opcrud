import { useState, useEffect } from "react";

export default function BookForm({ onSubmit, initialData }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setAuthor(initialData.author);
    }
  }, [initialData]);

  return (
    <form
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
      <button type="submit">{initialData ? "Actualizar" : "Agregar"} Libro</button>
    </form>
  );
}
