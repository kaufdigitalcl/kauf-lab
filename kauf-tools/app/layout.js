import "./globals.css";

export const metadata = {
  title: "Kauf Tools",
  description: "Herramientas internas de Kauf",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
