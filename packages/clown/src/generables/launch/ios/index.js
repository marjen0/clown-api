const { platforms } = require('../../../constants');

const { IOS } = platforms;

const launchIcons = [
  {
    name: 'appicon-60@2x',
    device: 'iPhone 4/4S/5/5C/5S/6 iPod touch 5th generation',
    scale: '2x',
    dimensions: '120x120',
    platform: IOS,
  },
  {
    name: 'appicon-60@3x',
    device: 'iPhone 6 Plus',
    scale: '3x',
    dimensions: '180x180',
    platform: IOS,
  },
  {
    name: 'appicon-76',
    device: 'iPad non-retina',
    scale: '1x',
    dimensions: '76x76',
    platform: IOS,
  },
  {
    name: 'appicon-76@2x',
    device: 'iPad retina',
    scale: '2x',
    dimensions: '152x152',
    platform: IOS,
  },
  {
    name: 'appicon-83.5@2x',
    device: 'iPad Pro',
    scale: '2x',
    dimensions: '167x167',
    platform: IOS,
  },
  {
    name: 'appstore@1x',
    device: 'iPad Pro',
    scale: '1x',
    dimensions: '1024x1024',
    platform: IOS,
  },
];

module.exports = launchIcons;
