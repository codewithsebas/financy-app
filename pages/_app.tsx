import "@/styles/globals.css";
import type { AppProps } from "next/app";
import ClientProviders from "@/provider/ClientProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClientProviders>
      <Component {...pageProps} />
    </ClientProviders>
  );
}
