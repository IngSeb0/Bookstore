import * as React from "react";
import { Author } from "../types/author";

type Props = {
  author: Author;
  onEdit: (a: Author) => void;
  onDelete: (id: string | undefined) => void;
};

export default function AuthorCard({ author, onEdit, onDelete }: Props) {
  return (
    <div className="border rounded p-4 flex gap-4 items-center">
      <img
        src={author.image || "/placeholder.png"}
        alt={author.name}
        className="w-20 h-20 object-cover rounded"
      />
      <div className="flex-1">
        <h3 className="text-lg font-medium">{author.name}</h3>
        <p className="text-sm text-gray-600">{author.description}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(author)}
          className="px-3 py-1 rounded font-semibold border border-blue-600 text-blue-600 bg-white shadow-sm
            hover:bg-blue-50 hover:text-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-colors duration-200"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(author.id)}
          className="px-3 py-1 rounded font-semibold border border-red-500 text-red-600 bg-red-50 shadow-sm
            hover:bg-red-100 hover:text-red-700 focus:ring-2 focus:ring-red-300 focus:outline-none transition-colors duration-200"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
