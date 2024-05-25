import { env } from 'node:process';
import express from 'express';
import type { NextFunction, Request, Response } from 'express';
import cors from 'cors';

function asyncRoute(cb: (req: Request, res: Response) => Promise<void>) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await cb(req, res);
        } catch (error) {
            next(error);
        }
    }; 
}

const app = express();

app.use(cors());

app.get('/ping', asyncRoute(async (req: Request, res: Response) => {
    res.send('PONG');
}));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: 'Something went terribly wrong' });
});

const PORT = Number(env.PORT ?? 3000);
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});