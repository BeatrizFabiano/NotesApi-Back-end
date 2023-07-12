require("express-async-errors");
require("dotenv/config")
const AppError = require("./utils/AppError")
const express = require("express");
const routes = require('./routes/index.routes')
const migrationsRun = require("./database/sqlite/migrations")
const uploadConfig = require("./config/upload")
const cors = require("cors");

const myServer = express();

myServer.use(cors());
myServer.use(express.json());
myServer.use(routes);

migrationsRun();

myServer.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));

myServer.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    });
  }
  console.log(error)

  return response.status(500).json({
    status: "error",
    message: "Internal server error"
  });
});

const PORT = process.env.PORT || 5000;
myServer.listen(PORT, () => console.log(`Server is ready to listen on Port ${PORT}`));