import { Router } from 'express';
import { getCount, incrementCount } from '../services/dynamodb.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.use(authMiddleware);

router.get('/count', async (req, res) => {
  try {
    const count = await getCount(req.user.username);
    if (count === null) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    res.json({ count });
  } catch (error) {
    console.error('Get count error:', error);
    res.status(500).json({ success: false, error: 'Failed to get count' });
  }
});

router.post('/count/increment', async (req, res) => {
  try {
    const newCount = await incrementCount(req.user.username);
    res.json({ count: newCount });
  } catch (error) {
    console.error('Increment error:', error);
    res.status(500).json({ success: false, error: 'Failed to increment count' });
  }
});

export default router;
