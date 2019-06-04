const helpers = {};
const _ = require("lodash");

// Get raw parameter values based on Mongoose model attributes
helpers.getModelRawParams = (params, model) => {
  const rawParams = {};
  const attributes = Object.keys(model.schema.paths);
  attributes.forEach(modelAttribute => {
    if (!_.isEmpty(params[modelAttribute])) {
      rawParams[modelAttribute] = params[modelAttribute];
    }
  });

  return rawParams;
};

module.exports = helpers;
