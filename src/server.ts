import express from 'express';
import serverless from 'serverless-http';
import dotenv from 'dotenv';

dotenv.config();
/** global constants */
const API_ROOT = process.env.NODE_ENV === 'production'
  ?'/.netlify/functions/server'
  : '/server';

/** controllers */
import echoRouter from './controllers/echo';
import checkRouter from './controllers/check';
import webhookRouter from './controllers/webhook';

const app = express();

/** Routes */
app.use(`${API_ROOT}/echo`, echoRouter);
app.use(`${API_ROOT}/check`, checkRouter);
app.use(`${API_ROOT}/webhook`, webhookRouter);
app.all('*', (req, res) => {
  res.status(404).json({
    error: {
      message: 'this is the 404 not found page!'
    }
  })
});

export const handler = serverless(app);