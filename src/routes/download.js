const fs = require('fs');
const path = require('path');
const express = require('express');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const {
  AssetsGenerator,
  FaviconGenerator,
  IconGenerator,
  NotificationGenerator,
  SplashGenerator,
  assetTypes,
} = require('clowngen');
const archiver = require('archiver');

const router = express.Router({ mergeParams: true });

const DIR = path.join(__dirname, '../../uploads');

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
  const archive = archiver('zip');
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

const createOutputDir = (filename) => {
  const uniqueOutputDir = path.join(__dirname, '../../outputs', filename);
  fs.mkdirSync(uniqueOutputDir);

  return uniqueOutputDir;
};

const getOptions = (filename, outputDir, platforms) => {
  const options = {
    source: path.join(__dirname, `../../uploads/${filename}`),
    output: outputDir,
    platforms,
  };

  return options;
};

router.post('/', upload.single('image'), async (req, res) => {
  const { type } = req.query;
  const targetedPlatforms = JSON.parse(req.body.platforms);
  const uniqueOutputDir = createOutputDir(req.file.filename);
  const generatedPathZip = `${uniqueOutputDir}/${type}.zip`;
  const generatedPath = `${uniqueOutputDir}/${type}`;
  const options = getOptions(
    req.file.filename,
    uniqueOutputDir,
    targetedPlatforms
  );

  const splashGenerator = new SplashGenerator(options);
  const notificationGenerator = new NotificationGenerator(options);
  const faviconGenerator = new FaviconGenerator(options);
  const iconGenerator = new IconGenerator(options);
  const assetsGenerator = new AssetsGenerator(options);
  switch (type) {
    case assetTypes.SPLASHSCREEN.name:
      await splashGenerator.generateSplashScreensAsync();
      await zipDirectory(generatedPath, generatedPathZip);
      await download(res, generatedPathZip);
      fs.rmSync(uniqueOutputDir, { recursive: true, force: true });
      fs.rmSync(req.file.path);
      break;
    case assetTypes.LAUNCHICON.name:
      await iconGenerator.generateLaunchIconsAsync();
      await zipDirectory(generatedPath, generatedPathZip);
      await download(res, generatedPathZip);
      fs.rmSync(uniqueOutputDir, { recursive: true, force: true });
      fs.rmSync(req.file.path);
      break;
    case assetTypes.FAVICON.name:
      await faviconGenerator.generateFaviconsAsync();
      await zipDirectory(generatedPath, generatedPathZip);
      await download(res, generatedPathZip);
      fs.rmSync(uniqueOutputDir, { recursive: true, force: true });
      fs.rmSync(req.file.path);
      break;
    case assetTypes.NOTIFICATIONICON.name:
      await notificationGenerator.generateNotificationIcon();
      await zipDirectory(generatedPath, generatedPathZip);
      await download(res, generatedPathZip);
      fs.rmSync(uniqueOutputDir, { recursive: true, force: true });
      fs.rmSync(req.file.path);
      break;
    case assetTypes.ALL.name:
      await assetsGenerator.generateAllAssetsAsync();
      await zipDirectory(generatedPath, generatedPathZip);
      await download(res, generatedPathZip);
      fs.rmSync(uniqueOutputDir, { recursive: true, force: true });
      fs.rmSync(req.file.path);
      break;

    default:
      res.status(400).json({ error: 'bad asset type' });
      break;
  }
});

module.exports = router;
