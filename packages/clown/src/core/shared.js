const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const Jimp = require('jimp');

const extractCornerColor = (jimpImage) => {
  const hex = jimpImage.getPixelColor(0, 0);
  const { r, g, b } = Jimp.intToRGBA(hex);
  return { r, g, b };
};
const resize = (sharpImage, jimpImage, width, height, round = false) => {
  const { r, g, b } = extractCornerColor(jimpImage);
  let img;
  img = sharpImage.resize(width, height, {
    fit: 'contain',
    background: { r, g, b },
  });
  if (round) {
    const rect = Buffer.from(
      `<svg><rect x="0" y="0" width="${width}" height="${height}" rx="${
        width / 2
      }" ry="${height / 2}"/></svg>`
    );
    img = sharpImage.composite([{ input: rect, blend: 'dest-in' }]);
  }
  return img;
};
const negate = (sharpImage) => {
  sharpImage.negate();
};
const tint = (sharpImage) => {
  sharpImage.tint();
};
const addText = (sharpImage, text, fontSize, fontColor, width, height) => {
  const textedSVG = Buffer.from(`
    <svg height="${height}" width="${width}">
      <text x="0" y="${fontSize}" font-size="${fontSize}" fill="${fontColor}">
        ${text}
      </text>
    </svg>`);
  sharpImage.composite([{ input: Buffer.from(textedSVG), top: 0, left: 0 }]);
};

const writeToFile = (image, outputDir, filename) => {
  image.toFile(`${outputDir}/${filename}.png`, (err) => {
    if (err) {
      console.log(chalk.red(err));
    }
  });
};

const createOutputDirs = (outputDir, platform, assetsType) => {
  // resolves to output/LaunchScreen
  const assetTypeOutputDir = path.resolve(outputDir, assetsType);
  // resolves to output/LaunchScreen/ios
  const platformOutputDir = path.resolve(
    outputDir,
    assetTypeOutputDir,
    platform
  );
  if (!fs.existsSync(assetTypeOutputDir)) {
    fs.mkdirSync(assetTypeOutputDir);
  }
  if (fs.existsSync(platformOutputDir)) {
    console.log(
      chalk.yellow(
        `Found output directory for ${platform} platform at ${platformOutputDir}`
      ),
      chalk.hex('#000').bgYellow('WILL DELETE IT.')
    );
    fs.rmSync(platformOutputDir, { recursive: true, force: true });
    console.log(
      chalk.yellow(
        `created new output directory for ${platform} platform at ${platformOutputDir}`
      )
    );
    fs.mkdirSync(platformOutputDir);
  } else {
    console.log(
      chalk.yellow(
        `could not find output directory for ${platform} platform at ${platformOutputDir}`
      ),
      chalk.hex('#000').bgYellow('WILL CREATE IT.')
    );
    fs.mkdirSync(platformOutputDir);
  }
  return platformOutputDir;
};
exports.tint = tint;
exports.resize = resize;
exports.negate = negate;
exports.addText = addText;
exports.writeToFile = writeToFile;
exports.createOutputDirs = createOutputDirs;
