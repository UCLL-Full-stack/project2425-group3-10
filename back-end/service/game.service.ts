import gameDb from '../domain/data-access/game.db';
import { Game } from '../domain/model/game';

const getAllGames = async (): Promise<Game[]> => {
    return gameDb.getALlGames();
}

const getGameById = async (gameId: number): Promise<Game> => {
    return gameDb.getGameById(gameId);
}

const createGame = async (newGame: Game): Promise<Game> => {
    return gameDb.createGame(newGame);
}

const updateGame = async (updatedGame: Game): Promise<Game> => {
    return gameDb.updateGame(updatedGame);
}

const deleteGame = async (gameId: number): Promise<Game> => {
    return gameDb.deleteGame(gameId);
}

export default {
    getAllGames,
    getGameById,
    createGame,
    updateGame,
    deleteGame
}