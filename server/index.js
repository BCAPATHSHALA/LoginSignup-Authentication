const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongodbConnection = require("./dbConnect");
const authRouter = require("./Routes/authRouter");
const postsRouter = require("./Routes/postsRouter");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//Config
dotenv.config({ path: "./.env" });

//Middleware
app.use(express.json());
app.use(morgan());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000", //! Frontend Base URL as Origin
  })
);

app.use("/auth", authRouter);
app.use("/posts", postsRouter);

//PORT from .env file
const PORT = process.env.PORT || 4001;

//Call The DbConnection File
mongodbConnection();

//Listening Method
app.listen(PORT, () => {
  console.log(`listening on PORT: ${PORT}`);
});
