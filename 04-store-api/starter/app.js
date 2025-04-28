require("dotenv").config();
const connectDB = require("./db/connect");
// async errors: handle try-catch blocks and allow throwing errors
// and let your error-handler handle it
require("express-async-errors");

const express = require("express");
const app = express();

const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");
// products router
const productsRouter = require("./routes/products");

// middleware
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send(`<h1>Store API</h1><a href="/api/v1/products">Products</a>`);
});

// products route
app.use("/api/v1/products", productsRouter);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT | 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port);
    console.log(`Server is listening on ${port}\nDatabase is connected`);
  } catch (error) {
    console.log(error);
  }
};

start();
