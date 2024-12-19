import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <>
            <Head>
                <title>PlayPal</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main className="min-h-screen bg-gradient-to-b text-white">
                <div className="container mx-auto px-6 md:px-12 lg:px-20 py-16">
                    <div className="text-center">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            Welkom bij <span className="text-yellow-300">PlayPal</span>
                        </h1>
                        <p className="text-lg md:text-xl mb-8 leading-relaxed max-w-3xl mx-auto">
                            Het sociale platform dat gamers samenbrengt. Kies een game, ontdek gelijkgestemde spelers
                            en speel samen. Verrijk je game-ervaring door nieuwe mensen te ontmoeten en groepen te
                            vormen.
                        </p>
                    </div>
                    <div className="grid-cols-3 gap-8 mt-16">
                        <div className="bg-white text-blue-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
                            <h2 className="text-xl font-semibold mb-4">Vind Medespelers</h2>
                            <p className="text-sm leading-relaxed">
                                Ontdek spelers die dezelfde games spelen en bouw snel een team om samen te winnen.
                            </p>
                        </div>
                        <div className="bg-white text-blue-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
                            <h2 className="text-xl font-semibold mb-4">Sluit je aan bij Groepen</h2>
                            <p className="text-sm leading-relaxed">
                                Doe mee aan bestaande groepen, leer nieuwe mensen kennen en speel samen met plezier.
                            </p>
                        </div>
                        <div className="bg-white text-blue-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
                            <h2 className="text-xl font-semibold mb-4">Verrijk je Ervaring</h2>
                            <p className="text-sm leading-relaxed">
                                Breid je netwerk uit, speel nieuwe spellen en deel onvergetelijke momenten met vrienden.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}
