import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Header from '@/components/Header';


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />

      </Head>
        <Header />
    </>
  );
}
