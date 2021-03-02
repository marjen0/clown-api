const { platforms } = require('../../../constants');

const { TVOS } = platforms;

const launchIcons = [
  {
    name: 'appicon-actual@1x',
    scale: '1x',
    dimensions: '400x240',
    platform: TVOS,
  },
  {
    name: 'appicon-focused@1x',
    scale: '1x',
    dimensions: '370x222',
    platform: TVOS,
  },
  {
    name: 'appicon-unfocused@1x',
    scale: '1x',
    dimensions: '300x180',
    platform: TVOS,
  },
  {
    name: 'appicon-actual@2x',
    scale: '2x',
    dimensions: '800x480',
    platform: TVOS,
  },
  {
    name: 'appicon-focused@2x',
    scale: '2x',
    dimensions: '740x444',
    platform: TVOS,
  },
  {
    name: 'appicon-unfocused@2x',
    scale: '2x',
    dimensions: '600x360',
    platform: TVOS,
  },
];

module.exports = launchIcons;
