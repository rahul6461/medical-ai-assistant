import multer from 'multer';
import path from 'path';

//Set Storage Engine
const storage=multer.diskStorage({
    destination: './uploads/',
    filename:(req,file,cb)=>{
        cb(null,`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

// Check file type
const checkFileType=(file,cb)=>{
    const filetypes=/jpeg|jpg|png|pdf/;
    const extname=filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype=filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null,true);
    }else{
        cb(new Error('Error: Only PDFs and Images (JPEG/JPG/PNG) are allowed!'));
    }
};

const upload=multer({
    storage:storage,
    limits: { fileSize: 10*1024*1024}, // 10MB limit
    fileFilter: (req,file,cb)=>{
        checkFileType(file,cb);
    }
});

export default upload;