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

const app = express();

/** Routes */
app.use(`${API_ROOT}/echo`, echoRouter);
app.use(`${API_ROOT}/check`, checkRouter);
app.all('*', (req, res) => {
  res.status(404).json({
    error: {
      message: 'this is the 404 not found page!'
    }
  })
});

export const handler = serverless(app);