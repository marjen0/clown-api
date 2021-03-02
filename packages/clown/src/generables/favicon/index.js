const { platforms, assetTypes } = require('../../constants');

const { WEB } = platforms;
const { FAVICON } = assetTypes;

const launchIcons = [
  {
    name: 'favicon-32',
    dimensions: '32x32',
    device: 'Standard for most desktop browsers',
    platform: WEB,
    type: FAVICON,
  },
  {
    name: 'favicon-128',
    dimensions: '128x128',
    device: 'Chrome Web Store icon & Small Windows 8 Star Screen Icon*',
    platform: WEB,
    type: FAVICON,
  },
  {
    name: 'favicon-152',
    dimensions: '152x152',
    device: 'iPad touch icon (Change for iOS 7: up from 144×144)',
    platform: WEB,
    type: FAVICON,
  },
  {
    name: 'favicon-167',
    dimensions: '167x167',
    device: 'iPad Retina touch icon',
    platform: WEB,
    type: FAVICON,
  },
  {
    name: 'favicon-180',
    dimensions: '180x180',
    device: 'iPhone Retina',
    platform: WEB,
    type: FAVICON,
  },
  {
    name: 'favicon-192',
    dimensions: '192x192',
    device: 'Google Developer Web App Manifest Recommendation',
    platform: WEB,
    type: FAVICON,
  },
  {
    name: 'favicon-196',
    dimensions: '196x196',
    device: 'Chrome for Android home screen icon',
    platform: WEB,
    type: FAVICON,
  },
];

module.exports = launchIcons;
