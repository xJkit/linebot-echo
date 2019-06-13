import express from 'express';
import getGlobalConfig from '../config/getGlobalConfig';

const router = express.Router();

/** constants */
const rootAdminName = 'joey54780';

const authMiddleware: express.RequestHandler = (req, res, next) => {
  try {
    if (req.headers.authorization !== `Bearer ${rootAdminName}`) {
      throw new Error('Not qualified user to check');
    }
  } catch (error) {
    return res.status(401).json({ error: { message: error.message } });
  }
  next();
}

router.use(authMiddleware);
router.post('/info', (req, res) => {
  res.json({
    message: 'Requiring credentials',
    token: {
      channelSecret: getGlobalConfig().channelSecret,
      channelAccessToken: getGlobalConfig().channelAccessToken,
    }
  });
})
router.post('*', (req, res) => {
  res.status(404).json({
    message: 'check nowhere'
  })
})
router.get('*', (req, res) => {
  res.status(404).json({
    message: 'check nowhere'
  })
})

export default router;
