import { env } from 'node:process';
import express from 'express';
import type { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { ClientException } from './src/domain/exceptions/client-exception';
import { GRID_SIZE, createGrid, generateCode } from './src/main/init';

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

app.get('/grid', (req: Request, res: Response) => {
    res.json({
        grid: createGrid.createGrid(GRID_SIZE, (req.query.bias as string) || null)
    });
});

app.post('/code', bodyParser.json(), (req: Request, res: Response) => {
    res.json({
        grid: generateCode.generateCode(req.body.grid)
    });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ClientException) {
        res.status(err.status).json({ message: err.message });
    } else {
        console.log(err);
        res.status(500).json({ message: 'Something went terribly wrong' });
    }
});

const PORT = Number(env.PORT ?? 3000);
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});