import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Author } from "../types/author";

const authorSchema = z.object({
  name: z.string().min(2, "Nombre muy corto"),
  description: z.string().optional(),
  image: z.string().url().optional(),
  birthDate: z.string().optional(),
  bookName: z.string().min(1, "Nombre del libro es obligatorio"),
  bookIsbn: z.string().min(1, "ISBN es obligatorio"),
  bookImage: z.string().url("URL de la imagen del libro es inválida").optional(),
  bookPublishingDate: z.string().optional(),
  bookDescription: z.string().min(1, "Descripción del libro es obligatoria"),
  prizeName: z.string().min(1, "Nombre del premio es obligatorio"),
  prizeDescription: z.string().min(1, "Descripción del premio es obligatoria"),
  prizePremiationDate: z.string().optional(),
  prizeOrganization: z.string().optional()
});

type FormData = z.infer<typeof authorSchema>;

type Props = {
  initialValues?: Partial<Author>;
  onSubmit: SubmitHandler<FormData>;
  submitLabel?: string;
}

export default function AuthorForm({ initialValues, onSubmit, submitLabel = "Guardar" }: Props) {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(authorSchema),
    defaultValues: {
      name: initialValues?.name || "",
      description: initialValues?.description || "",
      image: initialValues?.image || "",
      birthDate: initialValues?.birthDate || "",
      bookName: "",
      bookIsbn: "",
      bookImage: "",
      bookPublishingDate: "",
      bookDescription: "",
      prizeName: "",
      prizeDescription: "",
      prizePremiationDate: "",
      prizeOrganization: ""
    }
  })
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
      <h3 className="text-lg font-semibold">Datos del Autor</h3>
      <div>
        <label className="block text-sm font-medium">Nombre</label>
        <input {...register("name", { required: true })} className="mt-1 block w-full border rounded p-2" />
      </div>
  <div>
        <label className="block text-sm font-medium">Descripción</label>
        <textarea {...register("description")} className="mt-1 block w-full border rounded p-2" />
      </div>
      <div>
        <label className="block text-sm font-medium">Imagen (URL)</label>
        <input {...register("image")} className="mt-1 block w-full border rounded p-2" />
      </div>
      <div>
        <label className="block text-sm font-medium">Fecha de nacimiento</label>
        <input type="date" {...register("birthDate")} className="mt-1 block w-full border rounded p-2" />
      </div>
      <h3 className="text-lg font-semibold mt-6">Libr</h3>
    <div>
        <label className="block text-sm font-medium">Nombre</label>
        <input {...register("bookName", { required: true })} className="mt-1 block w-full border rounded p-2" />
      </div>
      <div>
        <label className="block text-sm font-medium">ISBN</label>
        <input {...register("bookIsbn", { required: true })} className="mt-1 block w-full border rounded p-2" />
      </div>
      <div>
        <label className="block text-sm font-medium">Imagen</label>
        <input {...register("bookImage", { required: true })} className="mt-1 block w-full border rounded p-2" />
      </div>
      <div>
        <label className="block text-sm font-medium">Fecha de publicación</label>
        <input type="date" {...register("bookPublishingDate", { required: true })} className="mt-1 block w-full border rounded p-2" />
      </div>
      <div>
        <label className="block text-sm font-medium">Descripción</label>
        <textarea {...register("bookDescription", { required: true })} className="mt-1 block w-full border rounded p-2" />
      </div>
    <h3 className="text-lg font-semibold mt-6">Premio</h3>
      <div>
        <label className="block text-sm font-medium">Nombre del premio</label>
        <input {...register("prizeName", { required: true })} className="mt-1 block w-full border rounded p-2" />
      </div>
      <div>
        <label className="block text-sm font-medium">Descripción del premio</label>
        <textarea {...register("prizeDescription", { required: true })} className="mt-1 block w-full border rounded p-2" />
      </div>
      <div>
        <label className="block text-sm font-medium">Fecha de premiación</label>
        <input type="date" {...register("prizePremiationDate", { required: true })} className="mt-1 block w-full border rounded p-2" />
      </div>
      <div>
        <label className="block text-sm font-medium">Organización</label>
        <input {...register("prizeOrganization")} className="mt-1 block w-full border rounded p-2" />
      </div>
      <div>
        <button
          disabled={isSubmitting}
          type="submit"
          className="px-4 py-2 rounded font-semibold shadow transition-colors duration-200 bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
