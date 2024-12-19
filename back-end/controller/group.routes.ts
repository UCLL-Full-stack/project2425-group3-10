import express, {NextFunction, Request, Response} from "express";
import groupService from '../service/group.service';
import { Group } from '../domain/model/group';

const groupRouter = express.Router();

groupRouter.get('/:activityId', async (req: Request, res: Response, next: NextFunction)=>{
    try{
        const activityId = parseInt(req.params.activityId)
        const [groups]= await Promise.all([groupService.getGroupsByActivityId(activityId)])

        res.status(200).json(groups)
    }catch(error){
        next(error)
    }
});

groupRouter.post('/:groupId/user/:userId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const groupId = parseInt(req.params.groupId);
        const userId = parseInt(req.params.userId);

        await groupService.addUserToGroup(groupId, userId);

        res.status(201).send({ message: `User ${userId} added to group ${groupId}` });
    } catch (error) {
        next(error);
    }
});


groupRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, maxPlayers, currentPlayers, activityId } = req.body;

        if (!name || !maxPlayers || !activityId) {
            return res.status(400).send({ message: "Missing required fields: name, maxPlayers, activityId" });
        }

        // Instantiate a new Group object
        const newGroup = new Group({
            id: undefined,
            name,
            maxPlayers: parseInt(maxPlayers, 10),
            currentPlayers: currentPlayers ? parseInt(currentPlayers, 10) : 0, // Default to 0 if not provided
            activityId: parseInt(activityId, 10),
        });

        const createdGroup = await groupService.createGroup(newGroup);

        res.status(201).json(createdGroup);
    } catch (error) {
        next(error);
    }
});


export {groupRouter}
