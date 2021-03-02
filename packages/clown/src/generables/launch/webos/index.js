const { platforms } = require('../../../constants');

const { WEBOS } = platforms;

const launchIcons = [
  {
    name: 'icon',
    dimensions: '80x80',
    platform: WEBOS,
  },
  {
    name: 'largeicon',
    dimensions: '180x180',
    platform: WEBOS,
  },
];

module.exports = launchIcons;
