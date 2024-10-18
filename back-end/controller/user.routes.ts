import express, {NextFunction, Request, Response} from "express";
import userService from "../service/user.service";
import {User} from "../domain/model/user";

/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Users:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            email:
 *              type: string
 *              description: user's Email.
 *            password:
 *              type: string
 *              description: User's Password.
 *            role:
 *              type: Role
 *              description: Users'Role
 */

const userRouter = express.Router()

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get a list of all Users.
 *     responses:
 */
userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users: User[] = await userService.getAllUsers();
        res.json(users);  // Send the users array as a JSON response
    } catch (error) {
        next(error);  // Pass any errors to the error-handling middleware
    }
});

export {userRouter}