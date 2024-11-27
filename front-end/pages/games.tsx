import Header from '@/components/Header';
import { useEffect, useState } from 'react';
import { Game } from '@/types';
import gameService from '@/services/GameService';
import GameCard from '@/components/game/GameCard';

const Games: React.FC = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [selectedGame, setSelectedGame] = useState<Game | null>(null);
    const [error, setError] = useState<string>('');

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
            <Header />
            {error && <p className="text-red-500">{error}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {games && games.map((game) => (
                    <GameCard key={game.id} game={game} />
                ))}
            </div>
        </>
    );
};

export default Games;
