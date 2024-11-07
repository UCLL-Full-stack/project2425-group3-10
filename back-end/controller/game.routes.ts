import express, {NextFunction, Request, Response} from "express";
import gameService from '../service/game.service';
import { Game } from '../domain/model/game';


/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Game:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         name:
 *           type: string
 *           description: Game's Name.
 *         genre:
 *           type: Genre
 *           description: Game's Genre.
 *         logo:
 *           type: string
 *           description: Game's Logo.
 */

const gameRouter = express.Router()

/**
 * @swagger
 * /games:
 *   get:
 *     summary: Get all Games.
 *
 */
 gameRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const games: Game[] = await gameService.getAllGames();
        res.status(200).json(games);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /games/{gameId}:
 *   get:
 *     summary: Get a Game by ID.
 *     parameters:
 *       - in: path
 *         name: gameId
 *         required: true
 *         schema:
 *           type: integer
 */
gameRouter.get('/:gameId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const gameId = parseInt(req.params.gameId);
        const game: Game = await gameService.getGameById(gameId);
        res.status(200).json(game);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /games:
 *   post:
 *     summary: Create a new Game.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Game'
 */
gameRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newGame: Game = Game.from(req.body);
        const game: Game = await gameService.createGame(newGame);
        res.status(201).json(game);
    } catch (error) {
        next(error);
    }
}
);

/**
 * @swagger
 * /games/{gameId}:
 *   put:
 *     summary: Update a Game by ID.
 *     parameters:
 *       - in: path
 *         name: gameId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Game'
 */
gameRouter.put('/:gameId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updatedGame: Game = Game.from(req.body);
        const game: Game = await gameService.updateGame(updatedGame);
        res.status(200).json(game);
    } catch (error) {
        next(error);
    }
}
);

/**
 * @swagger
 * /games/{gameId}:
 *   delete:
 *     summary: Delete a Game by ID.
 *     parameters:
 *       - in: path
 *         name: gameId
 *         required: true
 *         schema:
 *           type: integer
 */
gameRouter.delete('/:gameId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const gameId = parseInt(req.params.gameId);
        const game: Game = await gameService.deleteGame(gameId);
        res.status(200).json(game);
    } catch (error) {
        next(error);
    }
});




export { gameRouter };