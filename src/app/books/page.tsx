"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { apiGET } from "../../../utils/fetcher";

interface Book {
  id: number | string;
  name: string;
  image: string;
  description: string;
  publishingDate?: string;
}

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiGET<Book[]>("/books")
      .then(setBooks)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Cargando libros...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid grid-cols-1 ">
      {books.map(book => (
        <Link key={book.id} href={`/books/${book.id}`} className="border rounded shadow p-4 bg-white flex flex-col items-center hover:bg-blue-50 transition-colors">
          <img src={book.image} alt={book.name} className="w-32 h-48 object-cover mb-2 rounded" />
          <h3 className="font-bold text-lg mb-1">{book.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{book.description}</p>
          <span className="text-xs text-gray-500">{book.publishingDate ? new Date(book.publishingDate).toLocaleDateString() : "Sin fecha"}</span>
        </Link>
      ))}
    </div>
  );
}
