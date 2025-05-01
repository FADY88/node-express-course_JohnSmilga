const CustomAPIError = require("./custom-error");
const BadRequest = require("./bad-request");
const Unauthenticated = require("./unauthorized");

module.exports = {
  CustomAPIError,
  BadRequest,
  Unauthenticated,
};
