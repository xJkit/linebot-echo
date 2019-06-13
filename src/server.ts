import express from 'express';
import serverless from 'serverless-http';

/** global constants */
const API_ROOT = process.env.NODE_ENV === 'production'
  ?'/.netlify/functions/server'
  : '/server';

/** controllers */
import echoRouter from './controllers/echo';

const app = express();
app.use(`${API_ROOT}/echo`, echoRouter);
app.get('*', (req, res) => {
  res.status(404).json({
    error: {
      message: 'this is the 404 not found page!'
    }
  })
});

export const handler = serverless(app);