const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const {
  generateLaunchIcons,
  generateSplashScreens,
  generateFavicons,
  assetTypes,
  platforms,
} = require('@marijus/clown-cli');
const archiver = require('archiver');

const router = express.Router({ mergeParams: true });

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

router.get('/', async (req, res) => {
  const { type } = req.query;
  const uuid = uuidv4();
  const generatedPathZip = `/Users/marijus/Documents/clown-api/src/files/output/${type}.zip`;
  const generatedPath = `/Users/marijus/Documents/clown-api/src/files/output/${type}`;
  const options = {
    source: '/Users/marijus/Desktop/base.png',
    output: '/Users/marijus/Documents/clown-api/src/files/output',
    platforms: [platforms.ANDROID, platforms.IOS, platforms.ANDROIDTV],
  };

  switch (type) {
    case assetTypes.SPLASHSCREEN.name:
      await generateSplashScreens(options);
      await zipDirectory(generatedPath, generatedPathZip);
      await download(res, generatedPathZip);
      fs.rmSync(generatedPathZip);
      fs.rmSync(generatedPath, { recursive: true, force: true });
      break;
    case assetTypes.LAUNCHICON.name:
      await generateLaunchIcons(options);
      await zipDirectory(generatedPath, generatedPathZip);
      await download(res, generatedPathZip);
      fs.rmSync(generatedPathZip);
      fs.rmSync(generatedPath, { recursive: true, force: true });
      break;
    case assetTypes.FAVICON.name:
      await generateFavicons(options);
      await zipDirectory(generatedPath, generatedPathZip);
      await download(res, generatedPathZip);
      fs.rmSync(generatedPathZip);
      fs.rmSync(generatedPath, { recursive: true, force: true });
      break;
    default:
      res.status(400).json({ error: 'bad asset type' });
      break;
  }
});

module.exports = router;
