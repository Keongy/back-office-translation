import "./globals.css";
import {Inter} from "next/font/google";
import ClientSessionProvider from "./components/ClientSessionProvider"; // Importer le composant client

const inter = Inter({subsets: ["latin"]});

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientSessionProvider>{children}</ClientSessionProvider>
      </body>
    </html>
  );
}
