const { platforms } = require('../../../constants');

const { ANDROIDTV } = platforms;

const launchIcons = [
  {
    name: 'appicon',
    dirName: 'drawable-ldpi',
    dimensions: '1280x720',
    density: 'ldpi',
    platform: ANDROIDTV,
  },
  {
    name: 'appicon',
    dirName: 'drawable-mdpi',
    dimensions: '320x180',
    density: 'mdpi',
    platform: ANDROIDTV,
  },
  {
    name: 'banner',
    dirName: 'drawable',
    dimensions: '1280x720',
    density: 'mdpi',
    platform: ANDROIDTV,
  },
  {
    name: 'banner2',
    dirName: 'drawable',
    dimensions: '320x180',
    density: 'mdpi',
    platform: ANDROIDTV,
  },
];

module.exports = launchIcons;
