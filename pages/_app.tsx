// pages/_app.tsx
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import ClientProviders from "@/provider/ClientProvider"; // Asegúrate de que la ruta sea correcta

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClientProviders>
      <Component {...pageProps} />
    </ClientProviders>
  );
}
