const fs = require('fs');
const path = require('path');
const express = require('express');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const {
  generateLaunchIcons,
  generateSplashScreens,
  generateFavicons,
  assetTypes,
  platforms,
} = require('clown');
const archiver = require('archiver');

const router = express.Router({ mergeParams: true });

const DIR = path.join(__dirname, '../../uploads');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, `${uuidv4()} + '-' + ${fileName}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  },
});

const zipDirectory = async (source, dest) => {
  const stream = fs.createWriteStream(dest);
  const archive = archiver('zip', { zlib: { level: 9 } });
  archive.on('error', (err) => {
    throw err;
  });
  await new Promise((resolve, reject) => {
    archive.pipe(stream);
    archive.directory(source, false);
    archive.on('error', (err) => {
      reject(err);
    });
    archive.finalize();
    stream.on('close', () => {
      resolve();
    });
  });
};

const download = (res, filePath) =>
  new Promise((resolve) => {
    res.download(filePath, (err) => {
      if (err) {
        return res.status(500).json({
          message: `Could not download the file. ${err}`,
        });
      }
      resolve();
    });
  });

router.post('/', upload.single('image'), async (req, res) => {
  const { type } = req.query;
  const generatedPathZip = `/Users/marijus/Documents/clown-api/outputs${type}.zip`;
  const generatedPath = `/Users/marijus/Documents/clown-api/outputs/${type}`;
  const options = {
    source: req.file.path,
    output: path.join(__dirname, '../../outputs'),
    platforms: [platforms.ANDROID, platforms.IOS, platforms.ANDROIDTV],
  };
  console.log(req);
  switch (type) {
    case assetTypes.SPLASHSCREEN.name:
      await generateSplashScreens(options);
      await zipDirectory(generatedPath, generatedPathZip);
      await download(res, generatedPathZip);
      //fs.rmSync(generatedPathZip);
      //fs.rmSync(generatedPath, { recursive: true, force: true });
      break;
    case assetTypes.LAUNCHICON.name:
      await generateLaunchIcons(options);
      await zipDirectory(generatedPath, generatedPathZip);
      await download(res, generatedPathZip);
      // fs.rmSync(generatedPathZip);
      // fs.rmSync(generatedPath, { recursive: true, force: true });
      break;
    case assetTypes.FAVICON.name:
      await generateFavicons(options);
      await zipDirectory(generatedPath, generatedPathZip);
      await download(res, generatedPathZip);
      //fs.rmSync(generatedPathZip);
      //fs.rmSync(generatedPath, { recursive: true, force: true });
      break;
    default:
      res.status(400).json({ error: 'bad asset type' });
      break;
  }
});

module.exports = router;
