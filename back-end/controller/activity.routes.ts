import express, {NextFunction, Request, Response} from "express";
import gameService from '../service/game.service';
import { Activity } from '../domain/model/activity';
/*import activityService from '../service/activity.service';*/

const activityRouter= express.Router()
/*
activityRouter.get('/:gameId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const gameId = parseInt(req.params.gameId);
        const [activities] = await Promise.all([activityService.getActivityByGame(gameId)]);

        // Send the activities as a response
        res.status(200).json(activities);
    } catch (error) {
        next(error);
    }
});*/

export {activityRouter}