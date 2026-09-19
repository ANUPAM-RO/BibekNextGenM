import "@/styles/globals.css";
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function App({ Component, pageProps }) {
  return (
    <div data-theme="modern" className={`${inter.variable} font-sans`}>
      <Head>
        <title>Bibek NextGen Technologies</title>
      </Head>
      <Component {...pageProps} />
    </div>
  );
}
