import fs from 'fs';
import multer from 'multer';
import path from 'path';
import { v6 } from 'uuid';

const UPLOADS_PATH = path.join(process.cwd(), 'uploads');
const FILE_SIZE = 1024 * 1024 * 1;

const storage = multer.diskStorage({
    destination(req, file, cb) {
        if (!fs.existsSync(UPLOADS_PATH)) {
            fs.mkdirSync(UPLOADS_PATH);
        }
        cb(null, UPLOADS_PATH);
    },
    filename(req, file, cb) {
        cb(null, path.parse(file.originalname).name + '-' + v6() + path.extname(file.originalname));
    },
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'jpg'
    ) {
        cb(null, true);
    } else {
        cb(new Error('Only PNG and JPEG files are allowed'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: FILE_SIZE,
    },
});

export default upload;
