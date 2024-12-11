import React from 'react';
import GameCard from '@/components/game/GameCard';
import { Game } from '@/types';

type Props = {
    games: Array<Game>;
    onGameClick: (game: Game) => void;
}

const GameOverview: React.FC<Props> = ({ games, onGameClick }: Props) => {
    return (
        <>
            <div className="grid grid-cols-2">
                {games && games.map((game) => (
                    <div key={game.id}
                         onClick={() => onGameClick(game)}
                         className="max-w-20">
                        <GameCard game={game} />
                    </div>
                ))}
            </div>
        </>
    );
};




export default GameOverview;