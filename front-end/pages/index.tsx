import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTranslation } from "next-i18next";

export default function Home() {
    const { t } = useTranslation();

    return (
        <>
            <Head>
                <title>{t("title")}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main className="min-h-screen bg-gradient-to-b text-white">
                <div className="container mx-auto px-6 md:px-12 lg:px-20 py-16">
                    <div className="text-center">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            {t("welcome")} <span className="text-yellow-300">{t("title")}</span>
                        </h1>
                        <p className="text-lg md:text-xl mb-8 leading-relaxed max-w-3xl mx-auto">
                            {t("platform_intro")}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                        <div className="bg-white text-blue-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
                            <h2 className="text-xl font-semibold mb-4">{t("find_players_title")}</h2>
                            <p className="text-sm leading-relaxed">{t("find_players_desc")}</p>
                        </div>
                        <div className="bg-white text-blue-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
                            <h2 className="text-xl font-semibold mb-4">{t("join_groups_title")}</h2>
                            <p className="text-sm leading-relaxed">{t("join_groups_desc")}</p>
                        </div>
                        <div className="bg-white text-blue-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
                            <h2 className="text-xl font-semibold mb-4">{t("enrich_experience_title")}</h2>
                            <p className="text-sm leading-relaxed">{t("enrich_experience_desc")}</p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
