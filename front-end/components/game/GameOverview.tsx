import React, {useEffect, useState} from 'react';
import GameCard from '@/components/game/GameCard';
import {Game, Activity} from '@/types';
import ActivityTable from '@/components/activity/activityTable';
import activityService from '@/services/ActivityService';
import gameService from "@/services/GameService";

type Props = {
    games: Array<Game>;
    onGameClick: (game: Game) => void;
};

const GameOverview: React.FC<Props> = ({games, onGameClick}: Props) => {
    const [game, setGame] = useState<Game>();
    const [activities, setActivities] = useState<Activity[] | null>(null);

    const getActivities = async (gameId: number) => {
        try {
            const response: Response = await activityService.getActivitiesFromGame(gameId);
            if (!response.ok) {
                throw new Error(`error fetching activities ${response.statusText}`);
            }
            const activities = await response.json();
            setActivities(activities)
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (game) {
            getActivities(game.id);
        }
    }, [game]);

    return (
        <>
            <div className="grid grid-cols-2 max-w-20">
                {games && games.map((gameItem) => (
                    <div
                        key={gameItem.id}
                        onClick={() => setGame(gameItem)}
                        className="max-w-20"
                    >
                        <GameCard game={gameItem}/>
                        {/* if game is present, AND game.id is the same as the gameItem.Id AND activities have been loaded THEN render the activity table*/}
                        {game && game.id === gameItem.id && activities && <ActivityTable activities={activities}/>}
                    </div>
                ))}

            </div>
        </>
    );
};

export default GameOverview;
