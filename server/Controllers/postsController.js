const { success } = require("../Utils/responseWrapper");

const getAllPostController = async (req, res, next) => {
  console.log(req._id);
  return res.send(success(200, "All post here"));
};

module.exports = getAllPostController;
