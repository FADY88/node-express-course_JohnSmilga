const express = require("express");
const app = express();

const { products } = require("./data.js");
// middleware and static assets
// app.use(express.static("./navbar-app", { root: __dirname }));

app.get("/", (req, res) => {
  // send api response
  res.send('<h1>Home Page</h1><a href="/api/products">products</a>');
});

app.get("/api/products", (req, res) => {
  const newProducts = products.map(p => {
    const { id, name, image } = p;
    return { id, name, image };
  });
  res.json(newProducts);
});

app.get("/api/products/:id", (req, res) => {
  const newProduct = products.find(p => p.id === +req.params.id);
  if (!newProduct) {
    return res.status(404).send("Product Does Not Exist");
  }
  res.json(newProduct);
});

app.get("/api/products/:productID/reviews/:reviewID", (req, res) => {
  console.log(req.params);
  res.send("hello world");
});

app.get("/api/v1/query", (req, res) => {
  // console.log(req.query);
  const { search, limit } = req.query;
  let sortedProducts = [...products]; // create another list to edit it

  if (search) {
    sortedProducts = sortedProducts.filter(p => {
      return p.name.startsWith(search);
    });
  }
  if (limit) {
    sortedProducts = sortedProducts.slice(0, +limit);
  }
  if (sortedProducts.length < 1) {
    // return res.status(200).send("no products matched your search");
    return res.status(200).json({ success: "true", data: [] });
  }
  res.json(sortedProducts);
});

app.listen(5000, () => {
  console.log("Staring listening at port 5000");
});
