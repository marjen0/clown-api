const orientations = { PORTRAIT: 'portrait', LANDSCASPE: 'landscape' };
const shapes = { ROUND: 'round', SQUARE: 'square' };
const platforms = {
  IOS: { name: 'ios', displayName: 'iOS' },
  ANDROID: { name: 'android', displayName: 'Android' },
  ANDROIDTV: { name: 'androidtv', displayName: 'AndroidTV' },
  TVOS: { name: 'tvos', displayName: 'tvOS' },
  WEB: { name: 'web', displayName: 'Web' },
  WEBOS: { name: 'webos', displayName: 'webOS' },
  FIRETV: { name: 'firetv', displayName: 'Fire TV' },
  MACOS: { name: 'macos', displayName: 'macOS' },
};
const { ANDROID, ANDROIDTV, FIRETV, IOS, MACOS, TVOS, WEB, WEBOS } = platforms;
const assetTypes = {
  SPLASHSCREEN: {
    name: 'SplashScreen',
    displayName: 'Splash screen',
    platforms: [ANDROID, ANDROIDTV, IOS, TVOS, WEBOS],
  },
  LAUNCHICON: {
    name: 'LaunchIcon',
    displayName: 'Launch Icon',
    platforms: [ANDROID, ANDROIDTV, FIRETV, IOS, MACOS, TVOS, WEBOS],
  },
  FAVICON: {
    name: 'Favicon',
    displayName: 'Favicon',
    platforms: [WEB],
  },
};

exports.orientations = orientations;
exports.shapes = shapes;
exports.platforms = platforms;
exports.assetTypes = assetTypes;
