//TODO: Error Handle Handling 9

//* Success
const success = (statusCode, result) => {
  return {
    status: "ok",
    statusCode,
    result,
  };
};

//* Error
const error = (statusCode, message) => {
  return {
    status: "error",
    statusCode,
    message,
  };
};

module.exports = {
  success,
  error,
};
