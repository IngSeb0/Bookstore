import "./globals.css";
import Layout from "../../components/Layout";

export const metadata = {
  title: "CRUD Autores",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body suppressHydrationWarning={true}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
