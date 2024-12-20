import Header from '@/components/Header';
import React, {useEffect, useState} from 'react';
import {Game} from '@/types';
import gameService from '@/services/GameService';
import GameCard from '@/components/game/GameCard';
import GameOverview from '@/components/game/GameOverview';
import Footer from "@/components/Footer";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Games: React.FC = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [selectedGame, setSelectedGame] = useState<Game | null>(null);
    const [error, setError] = useState<string>('');

    const handleSelectedGame = (game: Game) => {
        setSelectedGame(game)
        console.log(game)
    }

    const getGames = async () => {
        setError('');

        try {
            const response: Response = await gameService.getAllGames();
            if (!response.ok) {
                setError(response.statusText);
            } else {
                const games = await response.json();
                setGames(games);
            }
        } catch (error) {
            setError('Failed to load games');
        }
    };

    useEffect(() => {
        getGames();
    }, []);

    return (
        <>
            <Header/>
            {error && <p className="text-red-500">{error}</p>}
            <div className="max-w-150">
                <GameOverview games={games} onGameClick={handleSelectedGame}/>
            </div>
            <Footer/>
        </>
    );
};


export const getServerSideProps = async (context: { locale: any }) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale ?? "en", ["common"])),
        },
    };
};

export default Games;
