import React, { useEffect, useState } from 'react';
import GameCard from '@/components/game/GameCard';
import { Game, Activity } from '@/types';
import ActivityTable from '@/components/activity/activityTable';
import activityService from '@/services/ActivityService';

type Props = {
    games: Array<Game>;
    onGameClick: (game: Game) => void;
};

const GameOverview: React.FC<Props> = ({ games, onGameClick }: Props) => {
    const [selectedGame, setSelectedGame] = useState<Game | null>(null);
    const [activities, setActivities] = useState<Activity[] | null>(null);
    const [loading, setLoading] = useState(false);

    const getActivities = async (gameId: number) => {
        setLoading(true);
        try {
            const response: Response = await activityService.getActivitiesFromGame(gameId);
            if (!response.ok) {
                throw new Error(`Error fetching activities: ${response.statusText}`);
            }
            const activitiesData = await response.json();
            setActivities(activitiesData);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (selectedGame) {
            getActivities(selectedGame.id);
        }
    }, [selectedGame]);

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-8 text-center">Game Overview</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {games.map((game) => (
                    <div
                        key={game.id}
                        onClick={() => {
                            setSelectedGame(game);
                            onGameClick(game);
                        }}
                        className={`cursor-pointer border-2 rounded-lg p-4 transition-transform duration-200 transform hover:scale-105 ${
                            selectedGame?.id === game.id ? 'border-indigo-500' : 'border-gray-700'
                        } bg-gray-800`}
                        role="button"
                        aria-pressed={selectedGame?.id === game.id}
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') setSelectedGame(game);
                        }}
                    >
                        <GameCard game={game} />
                        <div className="mt-4 text-center">
                            <h3 className="font-semibold text-lg">{game.name}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 w-full">
                {selectedGame && (
                    <>
                        <h2 className="text-2xl font-semibold mb-4 text-center">
                            Activities for {selectedGame.name}
                        </h2>
                        {loading ? (
                            <p className="text-gray-400 text-center">Loading activities...</p>
                        ) : activities && activities.length > 0 ? (
                            <ActivityTable activities={activities} />
                        ) : (
                            <p className="text-gray-400 text-center">No activities found for this game.</p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default GameOverview;
