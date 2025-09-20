"use client";
import { useRouter, useParams } from "next/navigation";
import AuthorForm from "../../../../components/AuthorForm";
import { useAuthors } from "../../../../hooks/useAuthors";
import { useEffect, useState } from "react";
import { apiGET } from "../../../../utils/fetcher";
import { Author } from "../../../../types/author";

export default function EditAuthorPage() {
  const { authors, editAuthor } = useAuthors();
 
  const params = (typeof window !== "undefined") ? new URLSearchParams(window.location.search) : null;
  const id = typeof window !== "undefined" ? window.location.pathname.split("/").pop() : null;
  const router = useRouter();

  const [initial, setInitial] = useState<Author | null>(null);


  useEffect(() => {
    if (!id) return;
    const found = authors.find((a: Author) => a.id === id);
    if (found) {
      setInitial(found);
    } else {
      apiGET<Author>(`/authors/${id}`)
        .then(setInitial)
        .catch(() => setInitial(null));
    }
  }, [authors, id]);

  if (!initial) return <p>Cargando datos del autor...</p>;

  const handleSubmit = async (data: any) => {
    try {
      await editAuthor(initial.id as string, data);
      router.push("/authors");
    } catch (e) {
      alert("Error actualizando autor");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Editar Autor</h2>
      <AuthorForm initialValues={initial} onSubmit={handleSubmit} submitLabel="Actualizar" />
    </div>
  );
}
