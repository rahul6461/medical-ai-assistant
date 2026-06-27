import express from 'express';
import upload from '../middleware/uploadMiddleware.js';
import { processReport, getReportHistory } from '../controllers/reportController.js';

const router = express.Router();

// POST /api/reports/analyze - Upload and analyze file
router.post('/analyze',upload.single('file'),processReport);

// GET /api/reports/history - Retrieve list of past records
router.get('/history',getReportHistory);

export default router;