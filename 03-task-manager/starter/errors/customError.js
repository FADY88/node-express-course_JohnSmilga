class CustomAPIError extends Error {
  constructor(msg, status) {
    super(msg);
    this.status = status;
  }
}

const createCustomError = (msg, status) => {
  return new CustomAPIError(msg, status);
};

module.exports = { CustomAPIError, createCustomError };
