const { orientations } = require('../../../constants/index');

const { PORTRAIT, LANDSCASPE } = orientations;

const splashScreens = [
  {
    name: 'splash-portrait',
    dirName: 'drawable-ldpi',
    dimensions: '200x320',
    density: 'ldpi',
    orientation: PORTRAIT,
  },
  {
    name: 'splash-landscape',
    dirName: 'drawable-ldpi',
    dimensions: '320x200',
    density: 'ldpi',
    orientation: LANDSCASPE,
  },
  {
    name: 'splash-portrait',
    dirName: 'drawable-mdpi',
    dimensions: '320x480',
    density: 'mdpi',
    orientation: PORTRAIT,
  },
  {
    name: 'splash-landscape',
    dirName: 'drawable-mdpi',
    dimensions: '480x320',
    density: 'mdpi',
    orientation: LANDSCASPE,
  },
  {
    name: 'splash-portrait',
    dirName: 'drawable-hdpi',
    dimensions: '480x720',
    density: 'hdpi',
    orientation: PORTRAIT,
  },
  {
    name: 'splash-landscape',
    dirName: 'drawable-hdpi',
    dimensions: '720x480',
    density: 'hdpi',
    orientation: LANDSCASPE,
  },
  {
    name: 'splash-portrait',
    dirName: 'drawable-xhdpi',
    dimensions: '720x960',
    density: 'xhdpi',
    orientation: PORTRAIT,
  },
  {
    name: 'splash-landscape',
    dirName: 'drawable-xhdpi',
    dimensions: '960x720',
    density: 'xhdpi',
    orientation: LANDSCASPE,
  },
  {
    name: 'splash-portrait',
    dirName: 'drawable-xxhdpi',
    dimensions: '960x1440',
    density: 'xxhdpi',
    orientation: PORTRAIT,
  },
  {
    name: 'splash-landscape',
    dirName: 'drawable-xxhdpi',
    dimensions: '1440x960',
    density: 'xxhdpi',
    orientation: LANDSCASPE,
  },
  {
    name: 'splash-portrait',
    dirName: 'xxx-hdpi',
    dimensions: '1280x1920',
    density: 'xxxhdpi',
    orientation: PORTRAIT,
  },
  {
    name: 'splash-landscape',
    dirName: 'drawable-xxxhdpi',
    dimensions: '1920x1280',
    density: 'xxxhdpi',
    orientation: LANDSCASPE,
  },
];

module.exports = splashScreens;
