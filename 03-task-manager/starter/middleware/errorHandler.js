const { CustomAPIError } = require("../errors/customError");

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.status).json({ msg: err.message });
  } else {
    return res
      .status(500)
      .json({ msg: "Something went wrong, please try again" });
  }
};

module.exports = errorHandler;
