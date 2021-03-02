/* eslint-disable no-console */
const chalk = require('chalk');
const sharp = require('sharp');
const Jimp = require('jimp');
const { parseDimensions } = require('../utils');
const favicons = require('../generables/favicon');
const { platforms, assetTypes } = require('../constants');
const { createOutputDirs, writeToFile, resize } = require('./shared');

const resizeFavicons = (image, jimpImage, output, data) => {
  const outputDir = createOutputDirs(
    output,
    platforms.WEB.name,
    assetTypes.FAVICON.name
  );
  data.forEach((favicon) => {
    const { width, height } = parseDimensions(favicon.dimensions);
    resize(image, jimpImage, width, height);
    writeToFile(image, outputDir, favicon.name);
    console.log(
      chalk.magenta(
        `GENERATED SPLASH SCREEN FOR ${favicon.device || favicon.platform}.`
      )
    );
  });
};

// --------------------------------- CORE FUNCTIONS ----------------------------------------------

const generateFavicons = async (options) => {
  const sharpImage = sharp(options.source);
  const jimpImage = await Jimp.read(options.source);
  resizeFavicons(sharpImage, jimpImage, options.output, favicons);
};
exports.generateFavicons = generateFavicons;
