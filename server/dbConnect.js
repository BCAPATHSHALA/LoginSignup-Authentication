const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const mongoURL = process.env.MONGODB_URL;

const mongoose = require("mongoose");

module.exports = async () => {
  try {
    await mongoose.connect(
      mongoURL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      () => {
        console.log(`MongoDB connected: ${mongoose.connection.host}`);
      }
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
