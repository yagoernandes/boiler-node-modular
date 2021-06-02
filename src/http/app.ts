import 'reflect-metadata';
import 'dotenv/config';

import express from 'express';

import cors from 'cors';
import 'express-async-errors';

import '@shared/adapters/index';
import '@shared/mongoose/connection';

import TokenExpiredError from '@shared/errors/TokenExpiredError';
import ValidatorError from '@shared/errors/ValidatorError';
import v1Routes from './api/v1';

const app = express();

app.use(cors());
app.use(express.json());

app.use(v1Routes);

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    _: express.NextFunction,
  ) => {
    console.log('error', err);
    if (process.env.NODE_ENV !== 'production') {
      console.log('error', err.stack);
    }

    if (err instanceof TokenExpiredError) {
      return res.status(401).json({
        code: 'token.expired',
        message: err.message,
      });
    }

    if (err instanceof ValidatorError) {
      return res.status(400).json(err);
    }

    return res.status(500).json({ error: 'Internal server error' });
  },
);

export default app;
