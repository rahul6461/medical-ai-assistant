import fs from 'fs';
import pdfParse from 'pdf-parse';
import Tesseract from 'tesseract.js';

export const extractTextFromFile =async (file) => {
    const filePath=file.path;
    const mimeType=file.mimetype;

    if(mimeType === 'application/pdf') {
        const dataBuffer=fs.readFileSync(filePath);
        const parsedData=await pdfParse(dataBuffer);
        return parsedData.text;
    }else if (mimeType.startsWith('image/')) {
        const { data:{ text }} = await Tesseract.recognize(filePath,'eng');
        return text;
    }else {
        throw new Error('Unsupported file format for text extraction');
    }
};