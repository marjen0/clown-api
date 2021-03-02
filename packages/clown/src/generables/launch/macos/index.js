const { platforms } = require('../../../constants');

const { MACOS } = platforms;

const launchIcons = [
  {
    name: 'appicon-512x512@1x',
    scale: '1x',
    dimensions: '512x512',
    platform: MACOS,
  },
  {
    name: 'appicon-1024x1024@2x',
    scale: '2x',
    dimensions: '1024x1024',
    platform: MACOS,
  },
  {
    name: 'appicon-256x256@1x',
    scale: '1x',
    dimensions: '256x256',
    platform: MACOS,
  },
  {
    name: 'appicon-512x512@2x',
    scale: '2x',
    dimensions: '512x512',
    platform: MACOS,
  },
  {
    name: 'appicon-128x128@1x',
    scale: '1x',
    dimensions: '128x128',
    platform: MACOS,
  },
  {
    name: 'appicon-256x256@2x',
    scale: '2x',
    dimensions: '256x256',
    platform: MACOS,
  },
  {
    name: 'appicon-32x32@1x',
    scale: '1x',
    dimensions: '32x32',
    platform: MACOS,
  },
  {
    name: 'appicon-64x64@2x',
    scale: '2x',
    dimensions: '64x64',
    platform: MACOS,
  },
  {
    name: 'appicon-16x16@1x',
    scale: '1x',
    dimensions: '16x16',
    platform: MACOS,
  },
  {
    name: 'appicon-32x32@2x',
    scale: '2x',
    dimensions: '32x32',
    platform: MACOS,
  },
];

module.exports = launchIcons;
