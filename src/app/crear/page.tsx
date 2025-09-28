"use client";
import { useRouter } from "next/navigation";
import AuthorForm from "../../../components/AuthorForm";
import { useAuthors } from "../../../hooks/useAuthors";
import { Author } from "../../../types/author";
import { apiPOST } from "../../../utils/fetcher";

type Book = {
  id: number | string;
};
type Prize = {
  id: number | string;
};
type Organization = {
  id: number | string;
};

export default function CrearPage() {
  const { createAuthor } = useAuthors();
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    try {
      const bookPayload: any = {
        name: data.bookName,
        isbn: data.bookIsbn,
        image: data.bookImage,
        description: data.bookDescription,
        editorial: { id: 1000 ,name: "BLOOMSBURY" }
      };
      if (data.bookPublishingDate && data.bookPublishingDate !== "") {
        bookPayload.publishingDate = data.bookPublishingDate;
      }
      const book: Book = await apiPOST("/books", bookPayload);
      const orgPayload = {
        name: "Premios Nacionales",
        tipoOrganizacion: "PRIVADA"
      };
      const organization: Organization = await apiPOST("/organizations", orgPayload);

      const prizePayload: any = {
        name: data.prizeName,
        description: data.prizeDescription,
        organization: organization};
      if (data.prizePremiationDate && data.prizePremiationDate !== "") {
        prizePayload.premiationDate = data.prizePremiationDate;
      }
      const prize: Prize = await apiPOST("/prizes", prizePayload);

      let birthDate = data.birthDate;
      if (birthDate) {
        birthDate = new Date(birthDate).toISOString().split('T')[0];
      }
      const authorPayload = {
        name: data.name,
        description: data.description,
        image: data.image,
        birthDate
      };
      const author = await createAuthor(authorPayload);
      await apiPOST(`/authors/${author.id}/books/${book.id}`, {});
      await apiPOST(`/prizes/${prize.id}/author/${author.id}`, {});
      router.push("/authors");
    } catch (e: any) {
      alert(e?.message || "errror")
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Crear Autor</h2>
      <AuthorForm onSubmit={handleSubmit} />
    </div>
  );
}
