import express from 'express';
import {
  middleware,
  JSONParseError,
  SignatureValidationFailed,
  Client,
} from '@line/bot-sdk';
import getGlobalConfig from '../config/getGlobalConfig';

const {
  channelAccessToken = '',
  channelSecret = '',
} = getGlobalConfig();
const lineClient = new Client({ channelAccessToken, channelSecret });
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
  const [event] = req.body.events;
  lineClient.replyMessage(
    event.replyToken,
    {
      type: 'text',
      text: '12345'
    }
  );
});

export default router;
