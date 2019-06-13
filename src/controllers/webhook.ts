import express from 'express';
import line from '@line/bot-sdk';
import getGlobalConfig from '../config/getGlobalConfig';

const {
  channelAccessToken = '',
  channelSecret = '',
} = getGlobalConfig();


const router = express.Router();
const client = new line.Client({ channelAccessToken, channelSecret });

/** for line bot webhook routes */
const mapEvents = (event: any) => {
  if (event.type === 'text') {
    console.log('got text event: ', event.message.text);
    return client.replyMessage(event.replayToken, {
      type: 'text',
      text: event.message.text
    })
  }
  console.log('got other events');
  return Promise.resolve(null);
}


router.use(line.middleware({ channelAccessToken, channelSecret }))
router.post('*', async (req, res) => {
  const result = Promise.all(req.body.events.map(mapEvents));
  res.json(result);
})

export default router;
