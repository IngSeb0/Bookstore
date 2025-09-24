"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiGET, apiPOST } from "../../../../utils/fetcher";

interface Review {
  id: number | string;
  text: string;
  rating: number;
  reviewer: string;
}

interface BookDetail {
  id: number | string;
  name: string;
  image: string;
  description: string;
  publishingDate?: string;
  isbn?: string;
  editorial?: { name: string };
  reviews?: Review[];
}

export default function BookDetailPage() {
  const params = useParams();
  const bookId = params.id;
  const [book, setBook] = useState<BookDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reviewText, setReviewText] = useState("");
  const [reviewer, setReviewer] = useState("");
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);

  const fetchBook = () => {
    setLoading(true);
    apiGET<BookDetail>(`/books/${bookId}`)
      .then(setBook)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    fetchBook();
  }, [bookId]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await apiPOST(`/books/${bookId}/reviews`, {
        text: reviewText,
        reviewer,
        rating
      });
      setReviewText("");
      setReviewer("");
      setRating(5);
      fetchBook();
    } catch (err) {
      alert("Error agregando review");
    } finally {
      setSubmitting(false);
    }
  };

;
  if (!book) return <div>No encontrado</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <img src={book.image} alt={book.name} className="w-40 h-60 object-cover mb-4 rounded" />
      <h2 className="text-2xl font-bold mb-2">{book.name}</h2>
      <div className="mb-2 text-gray-700">{book.description}</div>
      <div className="mb-2 text-sm text-gray-500">Fecha publicación: {book.publishingDate ? new Date(book.publishingDate).toLocaleDateString() : "Sin fecha"}</div>
      <div className="mb-2 text-sm text-gray-500">ISBN: {book.isbn}</div>
      <div className="mb-2 text-sm text-gray-500">Editorial: {book.editorial?.name}</div>
      <h3 className="text-lg font-semibold mt-6 mb-2">Reviews</h3>
      <ul className="mb-4">
        {book.reviews && book.reviews.length > 0 ? (
          book.reviews.map(r => (
            <li key={r.id} className="border-b py-2">
              <div className="font-semibold">{r.reviewer} <span className="text-xs text-gray-400">({r.rating}/5)</span></div>
              <div>{r.text}</div>
            </li>
          ))
        ) : (
          <li className="text-gray-400">No hay nada</li>
        )}
      </ul>
      <form onSubmit={handleReviewSubmit} className="space-y-2 border-t pt-4">
        <div>
          <label className="block text-sm font-medium">Tu nombre</label>
          <input value={reviewer} onChange={e => setReviewer(e.target.value)} className="mt-1 block w-full border rounded p-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium">Comentario</label>
          <textarea value={reviewText} onChange={e => setReviewText(e.target.value)} className="mt-1 block w-full border rounded p-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium">Calificación</label>
          <input type="number" min={1} max={5} value={rating} onChange={e => setRating(Number(e.target.value))} className="mt-1 block w-20 border rounded p-2" required />
        </div>
        <button type="submit" disabled={submitting} className="px-4 py-2 rounded font-semibold shadow transition-colors duration-200 bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed">
          Agregar Review
        </button>
      </form>
    </div>
  );
}
