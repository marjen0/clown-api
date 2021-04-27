const express = require('express');
const { download } = require('../controllers/download');
const MulterMiddleware = require('../middleware/upload');

const router = express.Router({ mergeParams: true });
const multer = new MulterMiddleware('../../uploads');

router.post('/', multer.upload, download);

module.exports = router;
