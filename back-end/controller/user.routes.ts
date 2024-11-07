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
 *      User:
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
 *  get:
 *  summary: Get all Users.
 *
 */

userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users: User[] = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     summary: Get a User by ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 */
userRouter.get('/:userId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = parseInt(req.params.userId);
        const user: User = await userService.getUserById(userId);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
})

/**
 * @swagger
 * /users/create:
 *   post:
 *     summary: Create a new User.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Users'
 *     responses:
 */
userRouter.post('/create', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newUser: User = req.body;
        const user: User = await userService.createUser(newUser);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
})

/**
 * @swagger
 * /users/update:
 *   put:
 *     summary: Update a User.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Users'
 *     responses:
 */
userRouter.put('/update', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updatedUser: User = req.body;
        const user: User = await userService.updateUser(updatedUser);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
})

/**
 * @swagger
 * /users/delete/{userId}:
 *   delete:
 *     summary: Delete a User by ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 */
userRouter.delete('delete/:userId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = parseInt(req.params.userId);
        const user: User = await userService.deleteUser(userId);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
})



export {userRouter}