import { Html, Head, Main, NextScript } from "next/document";


export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Financy App</title>
        <meta name="description" content="Sistema de gestión de ingresos y egresos" />
        <meta name="keywords" content="Sistema de gestión de ingresos y egresos" />
        <meta name="author" content="Sebastian Giraldo" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
