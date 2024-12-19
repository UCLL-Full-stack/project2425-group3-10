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
 * paths:
 *   /users/create:
 *     post:
 *       summary: Create a new user
 *       description: Creates a new user by accepting their email, password, and role. The password will be securely hashed before saving to the database.
 *       tags:
 *         - Users
 *       requestBody:
 *         description: User details for creating a new user
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - email
 *                 - password
 *                 - role
 *               properties:
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: user@example.com
 *                   description: The email address of the new user.
 *                 password:
 *                   type: string
 *                   example: securepassword123
 *                   description: The password for the new user.
 *                 role:
 *                   type: string
 *                   example: USER
 *                   enum: [USER, ADMIN]
 *                   description: The role of the new user. Either "USER" or "ADMIN".
 *       responses:
 *         '200':
 *           description: User successfully created
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                     description: The unique identifier of the user.
 *                   email:
 *                     type: string
 *                     example: user@example.com
 *                     description: The email address of the user.
 *                   role:
 *                     type: string
 *                     example: USER
 *                     description: The role of the user.
 *         '400':
 *           description: Bad Request
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: string
 *                     example: application error
 *                   message:
 *                     type: string
 *                     example: Invalid input data
 *         '500':
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: string
 *                     example: error
 *                   message:
 *                     type: string
 *                     example: An unexpected error occurred
 */
userRouter.post('/create', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newUser: User = new User({
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,

        })
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