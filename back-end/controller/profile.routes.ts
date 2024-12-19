import { NextFunction, Router } from 'express';
import { Profile } from '../domain/model/profile';
import profileService from '../service/profile.service';

const profileRouter = Router();

profileRouter.get('/', async (req, res, next: NextFunction) => {
    try {
        const profiles: Profile[] = await profileService.getAllProfiles();
        res.status(200).json(profiles);
    } catch (error) {
        next(error);
    }
});

export { profileRouter };