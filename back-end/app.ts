import * as dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import {userRouter} from "./controller/user.routes";
import {gameRouter} from "./controller/game.routes";
import { activityRouter } from './controller/activity.routes';
import helmet from 'helmet';
import { expressjwt } from 'express-jwt';
import { groupRouter } from './controller/group.routes';

const app = express();
dotenv.config();
/*app.use(
    expressjwt({
        secret: process.env.JWT_SECRET || 'default_secret',
        algorithms: ['HS256']
    }).unless({
        path: [
            /^\/api-docs\.*!/,
            "/users/login",
            "/users/create",
        ]
    })
)*/
app.use(cors());
app.use(helmet());
const port = process.env.APP_PORT || 3000;

app.use(bodyParser.json());
app.use('/users', userRouter);
app.use('/games', gameRouter);
app.use('/activities',activityRouter)
app.use('/groups',groupRouter)

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});


const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'PlayPal API',
            version: '1.0.0',
        },
    },
    apis: ['./controller/*.routes.ts'],
};

const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port || 3000, () => {
    console.log(`PlayPal API is running on port ${port}.`);
});



app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ message: 'Unauthorized' });
    }else if (err.name === 'Error') {
        res.status(400).json({ status: 'error',message: err.message });
    }else {
        next()
    }
});