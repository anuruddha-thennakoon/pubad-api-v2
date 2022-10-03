const multer = require('multer');
const path = require('path');
var constants = require('../../config/constants');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, constants.FILE_PATH);
    },
    filename: (req, file, cb) => {
        // console.log('file ',file);
        cb(null, (Math.random().toString(36).substring(2, 15) + Date.now() + Math.random().toString(36).substring(2, 15)) + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

module.exports = {
    upload: upload
}