const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const DIR = path.join(__dirname, '../../uploads');
const validMimetypes = ['image/png', 'image/jpg', 'image/jpeg'];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (validMimetypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      req.multerError = {
        code: 'file/bad-format',
        error: 'Only .png, .jpg and .jpeg format allowed',
      };
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!!!'));
    }
  },
});

const uploader = upload.single('image');

class MulterMiddleware {
  constructor(dirname) {
    this.dirname = path.join(__dirname, dirname);
    this.validMimetypes = ['image/png', 'image/jpg', 'image/jpeg'];
  }

  upload = (req, res, next) => {
    uploader(req, res, (err) => {
      if (req.multerError) {
        return res.status(400).json(req.multerError);
      }
      if (err) {
        return res.status(400).json(err);
      }
      next();
    });
  };
}

module.exports = MulterMiddleware;
