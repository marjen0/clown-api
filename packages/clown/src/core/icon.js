/* eslint-disable function-paren-newline */
/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const sharp = require('sharp');
const Jimp = require('jimp');

const { parseDimensions } = require('../utils');
const webosLaunchIcons = require('../generables/launch/webos');
const iosLaunchIcons = require('../generables/launch/ios');
const macosLaunchIcons = require('../generables/launch/macos');
const androidLaunchIcons = require('../generables/launch/android');
const androidTvLaunchIcons = require('../generables/launch/androidtv');
const tvosLaunchIcons = require('../generables/launch/tvos');

const { platforms, shapes, assetTypes } = require('../constants');
const {
  writeToFile,
  resize,
  createOutputDirs,
  addText,
  tint,
} = require('./shared');

const resizeGenericLaunchIcons = (
  sharpImage,
  jimpImage,
  options,
  platform,
  data
) => {
  const outputDir = createOutputDirs(
    options.output,
    platform,
    assetTypes.LAUNCHICON.name
  );
  data.forEach((icon) => {
    let dir = outputDir;
    const isRound = icon.shape ? icon.shape === shapes.ROUND : false;
    if (icon.dirName) {
      dir = path.resolve(outputDir, icon.dirName);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
    }
    const { width, height } = parseDimensions(icon.dimensions);
    resize(sharpImage, jimpImage, width, height, isRound);
    if (options.tint) {
      tint(sharpImage);
    }
    if (options.text) {
      const { text } = options;
      const fontSize = options.fontSize || 48;
      const fontColor = options.fontColor || '#FFF';
      addText(sharpImage, text, fontSize, fontColor, width, height);
    }
    writeToFile(sharpImage, dir, icon.name);
    console.log(
      chalk.magenta(
        `GENERATED LAUNCH ICON FOR ${icon.device || icon.platform}.`
      )
    );
  });
};

// --------------------------------- CORE FUNCTIONS ----------------------------------------------

const generateLaunchIcons = async (options) => {
  console.log(chalk.green('GENERATION STARTED'));
  const { platforms: optPlatforms } = options;
  const { IOS, TVOS, ANDROID, ANDROIDTV, WEBOS, MACOS } = platforms;
  const jimpImage = await Jimp.read(options.source);
  if (optPlatforms.includes(IOS)) {
    resizeGenericLaunchIcons(
      sharp(options.source),
      jimpImage,
      options,
      platforms.IOS.name,
      iosLaunchIcons
    );
  }
  if (optPlatforms.includes(TVOS)) {
    resizeGenericLaunchIcons(
      sharp(options.source),
      jimpImage,
      options,
      platforms.TVOS.name,
      tvosLaunchIcons
    );
  }
  if (optPlatforms.includes(ANDROID)) {
    resizeGenericLaunchIcons(
      sharp(options.source),
      jimpImage,
      options,
      platforms.ANDROID.name,
      androidLaunchIcons
    );
  }
  if (optPlatforms.includes(ANDROIDTV)) {
    resizeGenericLaunchIcons(
      sharp(options.source),
      jimpImage,
      options,
      platforms.ANDROIDTV.name,
      androidTvLaunchIcons
    );
  }
  if (optPlatforms.includes(WEBOS)) {
    resizeGenericLaunchIcons(
      sharp(options.source),
      jimpImage,
      options,
      platforms.WEBOS.name,
      webosLaunchIcons
    );
  }
  if (optPlatforms.includes(MACOS)) {
    resizeGenericLaunchIcons(
      sharp(options.source),
      jimpImage,
      options,
      platforms.MACOS.name,
      macosLaunchIcons
    );
  }

  console.log(chalk.hex('#000').bgGreen.bold('GENERATION DONE!'));
};

exports.generateLaunchIcons = generateLaunchIcons;
