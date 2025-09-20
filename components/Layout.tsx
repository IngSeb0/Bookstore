import * as React from "react";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Bookstore - CRUD Autores</h1>
          <nav className="space-x-4">
            <Link className="text-blue-600" href="/authors">Autores</Link>
            <Link className="text-blue-600" href="/crear">Crear Autor</Link>
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 py-6">{children}</main>
    </div>
  );
}
