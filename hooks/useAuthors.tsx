import { useEffect, useState } from "react";
import { Author } from "../types/author";
import { apiGET, apiPOST, apiPUT, apiDELETE } from "../utils/fetcher";
import { useAuthorsStore, State as AuthorsStoreState } from "../stores/useAuthorsStore";

export function useAuthors() {
  const authors = useAuthorsStore((s: AuthorsStoreState) => s.authors);
  const setAuthors = useAuthorsStore((s: AuthorsStoreState) => s.setAuthors);
  const addAuthorToStore = useAuthorsStore((s: AuthorsStoreState) => s.addAuthor);
  const updateAuthorInStore = useAuthorsStore((s: AuthorsStoreState) => s.updateAuthor);
  const removeAuthorFromStore = useAuthorsStore((s: AuthorsStoreState) => s.removeAuthor);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAuthors = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiGET<Author[]>("/authors");
      setAuthors(data);
    } catch (err: any) {
      setError(err.message || "Error fetching authors");
    } finally {
      setLoading(false);
    }
  };

  const createAuthor = async (author: Author) => {
    setLoading(true);
    setError(null);
    try {
      const created = await apiPOST<Author>("/authors", author);
      // backend retorna el autor creado
      addAuthorToStore(created);
      return created;
    } catch (err: any) {
      setError(err.message || "Error creating author");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const editAuthor = async (id: string, payload: Partial<Author>) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await apiPUT<Author>(`/authors/${id}`, payload);
      updateAuthorInStore(id, updated);
      return updated;
    } catch (err: any) {
      setError(err.message || "Error updating author");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteAuthor = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await apiDELETE(`/authors/${id}`);
      removeAuthorFromStore(id);
    } catch (err: any) {
      setError(err.message || "Error deleting author");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  return {
    authors,
    loading,
    error,
    fetchAuthors,
    createAuthor,
    editAuthor,
    deleteAuthor
  };
}
