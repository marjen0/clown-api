const { orientations } = require('../../../constants/index');
const { platforms } = require('../../../constants/index');

const { LANDSCASPE } = orientations;
const { TVOS } = platforms;

const splashScreens = [
  {
    name: 'Default@1x',
    scale: '1x',
    dimensions: '1920x1080',
    orientation: LANDSCASPE,
    platform: TVOS.name,
  },
  {
    name: 'Default@2x',
    scale: '2x',
    dimensions: '3840x2160',
    orientation: LANDSCASPE,
    platform: TVOS.name,
  },
];

module.exports = splashScreens;
