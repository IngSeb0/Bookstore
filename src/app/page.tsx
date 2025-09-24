import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8">
      <h2 className="text-2xl font-semibold">Bienvenido</h2>
      <p>Usa el menú para listar o crear autores.</p>
      <Link href="/books" className="mt-8 px-6 py-3 bg-blue-600 text-white rounded shadow hover:bg-blue-700 font-semibold transition-colors">
        Ver Libros
      </Link>
    </main>
  );
}
