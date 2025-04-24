const express = require("express");
const app = express();
let { people } = require("./data");

let reqNum = 0;
app.use((req, res, next) => {
  reqNum++;
  next();
});

app.get("/", (req, res) => {
  console.log(reqNum);
  res.send("Hello World");
});

app.listen(5000, error => {
  if (error) console.log(error);
  else console.log("Server is listening on port 5000");
});

// how some middleware in express parse http request body
// express.urlencoded parses the HTTP body from req since req is stream of the http body
// app.use((req, res, next) => {
//   let data = "";
//   req.on("data", chunk => {
//     data += chunk;
//   });
//   req.on("end", () => {
//     console.log("Raw body:", data);
//     next();
//   });
// });
