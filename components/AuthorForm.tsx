import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Author } from "../types/author";
const authorSchema = z.object({
  name: z.string().min(2, "Nombre muy corto"),
  description: z.string().optional(),
  image: z.string().url().optional(),
  birthDate: z.string().optional()
});

type FormData = z.infer<typeof authorSchema>;
type Props = {
  initialValues?: Partial<Author>;
  onSubmit: (data: FormData) => Promise<void> | void;
  submitLabel?: string;
};

export default function AuthorForm({ initialValues, onSubmit, submitLabel = "Guardar" }: Props) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(authorSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      description: initialValues?.description ?? "",
      image: initialValues?.image ?? "",
      birthDate: initialValues?.birthDate ?? ""
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
      <div>
        <label className="block text-sm font-medium">Nombre</label>
        <input {...register("name")} className="mt-1 block w-full border rounded p-2" />
        {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Descripción</label>
        <textarea {...register("description")} className="mt-1 block w-full border rounded p-2" />
      </div>

      <div>
        <label className="block text-sm font-medium">Imagen (URL)</label>
        <input {...register("image")} className="mt-1 block w-full border rounded p-2" />
        {errors.image && <p className="text-red-600 text-sm">{errors.image.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Fecha de nacimiento</label>
        <input type="date" {...register("birthDate")} className="mt-1 block w-full border rounded p-2" />
      </div>

      <div>
        <button
          disabled={isSubmitting}
          type="submit"
          className="px-4 py-2 rounded font-semibold shadow transition-colors duration-200
            bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
