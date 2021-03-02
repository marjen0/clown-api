const {
  platforms,
  assetTypes,
  orientations,
  shapes,
} = require('./src/constants');
const { generateFavicons } = require('./src/core/favicon');
const { generateLaunchIcons } = require('./src/core/icon');
const { generateSplashScreens } = require('./src/core/splash');

exports.platforms = platforms;
exports.assetTypes = assetTypes;
exports.orientations = orientations;
exports.shapes = shapes;
exports.generateFavicons = generateFavicons;
exports.generateLaunchIcons = generateLaunchIcons;
exports.generateSplashScreens = generateSplashScreens;
