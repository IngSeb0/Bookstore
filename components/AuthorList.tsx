import * as React from "react";
import { useAuthors } from "../hooks/useAuthors";
import AuthorCard from "./AuthorCard";
import { Author } from "../types/author";
import { useRouter } from "next/navigation";

export default function AuthorList() {
  const { authors, loading, error, deleteAuthor } = useAuthors();
  const router = useRouter();

  const handleEdit = (author: Author) => {
    router.push(`/authors/${author.id}`);
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!confirm("¿Seguro que deseas eliminar este autor?")) return;
    try {
      await deleteAuthor(id);
      alert("Autor eliminado");
    } catch (e: any) {
      const msg = typeof e?.message === "string" && e.message.includes("libros")
        ? "No se puede eliminar el autor porque tiene libros asociados."
        : "Error al eliminar";
      alert(msg);
    }
  };

  if (loading) return <p>Cargando autores...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;

  return (
    <div className="grid gap-4">
      {authors.length === 0 ? <p>No hay autores.</p> : null}
      {authors.map((a: Author) => (
        <AuthorCard key={a.id} author={a} onEdit={handleEdit} onDelete={handleDelete} />
      ))}
    </div>
  );
}
