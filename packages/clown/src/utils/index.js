const { parse } = require('commander');

const parseDimensions = (dimensions) => {
  let dim = dimensions.trim();
  dim = dim.split('x');
  return { width: +dim[0], height: +dim[1] };
};

exports.parseDimensions = parseDimensions;
