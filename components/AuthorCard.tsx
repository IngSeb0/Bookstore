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
        <button onClick={() => onEdit(author)} className="px-3 py-1 border rounded">Editar</button>
        <button onClick={() => onDelete(author.id)} className="px-3 py-1 border rounded bg-red-50 text-red-600">Eliminar</button>
      </div>
    </div>
  );
}
