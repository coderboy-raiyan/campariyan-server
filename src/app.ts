import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const app = express();

app.get('/', (req: Request, res: Response) => {
    return res.status(StatusCodes.OK).json({ success: true, message: 'Server is healthy!' });
});

export default app;
