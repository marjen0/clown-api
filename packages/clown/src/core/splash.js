/* eslint-disable comma-dangle */
/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const sharp = require('sharp');
const Jimp = require('jimp');

const { parseDimensions } = require('../utils');
const iosSplashScreens = require('../generables/splash/ios');
const tvosSplashScreens = require('../generables/splash/tvos');
const androidSplashScreens = require('../generables/splash/android');
const androidTvSplashScreens = require('../generables/splash/androidtv');
const webosSplashScreens = require('../generables/splash/webos');
const { platforms, assetTypes } = require('../constants');
const {
  resize,
  writeToFile,
  createOutputDirs,
  tint,
  addText,
} = require('./shared');

const resizeGenericSplashScreens = (
  image,
  jimpImage,
  options,
  platform,
  data
) => {
  const outputDir = createOutputDirs(
    options.output,
    platform,
    assetTypes.SPLASHSCREEN.name
  );

  data.forEach((splash) => {
    let dir = outputDir;
    if (splash.dirName) {
      dir = path.resolve(outputDir, splash.dirName);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
    }
    const { width, height } = parseDimensions(splash.dimensions);
    resize(image, jimpImage, width, height);
    if (options.tint) {
      tint(image);
    }
    if (options.text) {
      const { text } = options;
      const fontSize = options.fontSize || 48;
      const fontColor = options.fontColor || '#FFF';
      addText(image, text, fontSize, fontColor, width, height);
    }

    writeToFile(image, dir, splash.name);

    console.log(
      chalk.magenta(
        `GENERATED SPLASH SCREEN FOR ${splash.device || splash.platform}.`
      )
    );
  });
};

// --------------------------------- CORE FUNCTIONS ----------------------------------------------

const generateSplashScreens = async (options) => {
  console.log(chalk.green('GENERATION STARTED'));
  const { platforms: optPlatforms } = options;
  const { IOS, TVOS, ANDROID, ANDROIDTV, WEBOS } = platforms;
  const jimpImage = await Jimp.read(options.source);
  if (optPlatforms.includes(IOS)) {
    resizeGenericSplashScreens(
      sharp(options.source),
      jimpImage,
      options,
      platforms.IOS.name,
      iosSplashScreens
    );
  }
  if (optPlatforms.includes(TVOS)) {
    resizeGenericSplashScreens(
      sharp(options.source),
      jimpImage,
      options,
      platforms.TVOS.name,
      tvosSplashScreens
    );
  }
  if (optPlatforms.includes(ANDROID)) {
    resizeGenericSplashScreens(
      sharp(options.source),
      jimpImage,
      options,
      platforms.ANDROID.name,
      androidSplashScreens
    );
  }
  if (optPlatforms.includes(ANDROIDTV)) {
    resizeGenericSplashScreens(
      sharp(options.source),
      jimpImage,
      options,
      platforms.ANDROIDTV.name,
      androidTvSplashScreens
    );
  }
  if (optPlatforms.includes(WEBOS)) {
    resizeGenericSplashScreens(
      sharp(options.source),
      jimpImage,
      options,
      platforms.WEBOS.name,
      webosSplashScreens
    );
  }

  console.log(chalk.hex('#000').bgGreen.bold('GENERATION DONE!'));
};

exports.generateSplashScreens = generateSplashScreens;
