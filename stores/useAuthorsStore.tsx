import { create } from "zustand";
import { Author } from "../types/author";

export type State = {
  authors: Author[];
  setAuthors: (a: Author[]) => void;
  addAuthor: (a: Author) => void;
  updateAuthor: (id: string, a: Partial<Author>) => void;
  removeAuthor: (id: string) => void;
};

export const useAuthorsStore = create<State>((set) => ({
  authors: [],
  setAuthors: (authors: Author[]) => set({ authors }),
  addAuthor: (author: Author) =>
    set((state: State) => ({ authors: [...state.authors, author] })),
  updateAuthor: (id: string, partial: Partial<Author>) =>
    set((state: State) => ({
      authors: state.authors.map((a: Author) => (a.id === id ? { ...a, ...partial } : a))
    })),
  removeAuthor: (id: string) =>
    set((state: State) => ({ authors: state.authors.filter((a: Author) => a.id !== id) }))
}));
