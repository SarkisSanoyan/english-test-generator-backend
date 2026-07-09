import express from 'express';
import { saveResult } from '../controllers/admin.controller.js';

const router = express.Router();

router.post('/', saveResult);

export default router;
