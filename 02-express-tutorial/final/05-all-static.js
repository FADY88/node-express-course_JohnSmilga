const express = require("express");
const path = require("path");

const app = express();

// setup static and middleware
// statices should be in public but whatever
app.use(express.static("./navbar-app"));

// node by default search for index.html to be the root
// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname, './navbar-app/index.html'))
//   adding to static assets
//   SSR
// })

app.all("*", (req, res) => {
  res.status(404).send("resource not found");
});

app.listen(5000, () => {
  console.log("server is listening on port 5000....");
});
