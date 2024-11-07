import { Game } from '../model/game';
import { database } from '../../util/db.server';

const getALlGames = async ():Promise<Game[]> => {
    try {
        const gamesPrisma = await database.game.findMany();
        return gamesPrisma.map((gamePrisma) => Game.from(gamePrisma));
    } catch (error) {
        console.log(error);
        throw new Error(`Error occurred while getting all games`);
    }
}

const getGameById = async (gameId: number):Promise<Game> => {
    const game = await database.game.findUnique({
        where: {
            id: gameId
        }
    });
    if (!game) {
        throw new Error(`Game with id ${gameId} not found`);
    }
    return Game.from(game);
}

const createGame = async (newGame: Game):Promise<Game> => {
    const game = await database.game.create({
        data: {
            name: newGame.getName(),
            genre: newGame.getGenre(),
            logo: newGame.getLogo()
        }
    });
    return Game.from(game);
}

const updateGame = async (updatedGame: Game):Promise<Game> => {
    const game = await database.game.update({
        where: {
            id: updatedGame.getId()
        },
        data: {
            name: updatedGame.getName(),
            genre: updatedGame.getGenre(),
            logo: updatedGame.getLogo()
        }
    });
    return Game.from(game);
}

const deleteGame = async (gameId: number):Promise<Game> => {
    const game = await database.game.delete({
        where: {
            id: gameId
        }
    });
    return Game.from(game);
}

export default {getALlGames, getGameById, createGame, updateGame, deleteGame};