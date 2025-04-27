// database connection
const connectDB = require("./db/connect");

const express = require("express");
const app = express();

const tasks = require("./routers/tasks");
const errorHandler = require("./middleware/errorHandler");
// puts .env variables inside process.env property
require("dotenv").config();

// middleware for static media and front-end app
app.use(express.static("./public", { root: __dirname }));

// middleware to parse json data in http body
app.use(express.json());

// not found import
const notFound = require("./middleware/notFound");

// setup sub-application for route '/api/v1/tasks'
app.use("/api/v1/tasks", tasks);

app.use(notFound);

app.use(errorHandler);

const port = process.env.PORT | 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(
      port,
      console.log(`Server is listening on port ${port}\nDatabase is connected`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
