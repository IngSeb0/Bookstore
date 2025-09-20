"use client";
import { useRouter } from "next/navigation";
import AuthorForm from "../../../components/AuthorForm";
import { useAuthors } from "../../../hooks/useAuthors";
import { Author } from "../../../types/author";

export default function CrearPage() {
  const { createAuthor } = useAuthors();
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    let birthDate = data.birthDate;
    if (birthDate) {
      birthDate = new Date(birthDate).toISOString().split('T')[0];
    }
    const payload: Author = { ...data, birthDate, id: undefined };
    try {
      await createAuthor(payload);
      router.push("/authors");
    } catch (e) {
      alert("Error creando autor");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Crear Autor</h2>
      <AuthorForm onSubmit={handleSubmit} />
    </div>
  );
}
