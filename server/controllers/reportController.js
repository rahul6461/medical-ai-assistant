import Report from '../models/Report.js';
import { extractTextFromFile } from '../services/ocrService.js';
import { analyzeMedicalText } from '../services/geminiService.js';
import fs from 'fs';

export const processReport = async (req,res,next) => {
    try{
        if(!req.file) {
            res.status(400);
            throw new Error('No file uploaded');
        }

        // Step 1: Extract Text
        const extractedText = await extractTextFromFile(req.file);

        if(!extractedText || extractedText.trim().length === 0){
            res.status(422);
            throw new Error('Could not extract legible text from this document');
        }

        //Step 2: Pass Text to Gemini AI
        const aiAnalysis = await analyzeMedicalText(extractedText);

        // Step 3: Write to Database
        const newReport = await Report.create({
            fileName: req.file.originalname,
            fileType: req.file.mimetype,
            filePath: req.file.path,
            extractedText: extractedText,
            analysis: aiAnalysis    
        });

        // Send result back to frontend
        res.status(201).json({
            success: true,
            message: "Analysis complete",
            data: newReport
        });

    } catch(error) {
        // Clean up file from local storage if processing fails
        if(req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        next(error);
    }
};

export const getReportHistory= async (req,res,next) => {
    try {
        const reports = (await Report.find()).toSorted({createdAt: -1});
        res.status(200).json({success: true,count: reports.length,data:reports});
    }catch(error){
        next(error);
    }
};