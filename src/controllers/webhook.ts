import express from 'express';
import {
  middleware,
  JSONParseError,
  SignatureValidationFailed
} from '@line/bot-sdk';
import getGlobalConfig from '../config/getGlobalConfig';

const {
  channelAccessToken = '',
  channelSecret = '',
} = getGlobalConfig();

const router = express.Router();
const authMiddleware: express.ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof SignatureValidationFailed) {
    return res.status(401).send(err.signature);
  }
  if (err instanceof JSONParseError) {
    return res.status(400).send(err.raw);
  }
  next(err);
}

router.use(middleware({ channelAccessToken, channelSecret }))
router.use(authMiddleware);
router.post('*', async (req, res) => {
  res.json(req.body.events);
})

export default router;
