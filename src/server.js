import express, { json } from 'express';
import cors from 'cors';
import 'dotenv/config';

import authRouter from './routes/authRouter.js';
import userAccountRouter from './routes/userAccountRouter.js';

const PORT = process.env.PORT || 5000;

const server = express();

server.use(cors());
server.use(json());

server.use("/auth", authRouter);
server.use("/account", userAccountRouter);

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}.`);
});