import express from 'express';

const router = express.Router();

router.get('/:message', (req, res) => {
  res.json({
    message: `You say ${req.params.message}`
  });
})

router.get('*', (req, res) => {
  res.json({
    message: 'echo cannnot understand!'
  })
});

export default router;
