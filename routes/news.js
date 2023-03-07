import express from 'express';

const router = express.Router();
import newsController from '../controllers/news';

router.get('/getNews', newsController.getNews);

export default router;