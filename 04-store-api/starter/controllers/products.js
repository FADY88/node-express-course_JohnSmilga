const Product = require("../models/product");

const getAllProductsStatic = async (req, res, next) => {
  const search = "ab";
  const products = await Product.find({
    name: { $regex: search, $options: "i" },
  });
  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilter } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  if (numericFilter) {
    // numericFilter logic
    const options = ["price", "rating"];
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(>|>=|=|<|<=)\b/g;
    numericFilter
      .replace(regEx, match => `-${operatorMap[match]}-`)
      .split(",")
      .map(e => e.split("-"))
      .filter(e => options.includes(e[0]))
      .forEach(e => {
        const [field, op, value] = e;
        queryObject[field] = { [op]: Number(value) };
      });

    console.log(queryObject);
  }
  let result = Product.find(queryObject);
  if (sort) {
    result = result.sort(sort.replace(",", " "));
  } else {
    result = result.sort("createdAt");
  }
  if (fields) {
    result = result.select(fields.replace(",", " "));
  }
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const products = await result;
  res.status(200).json({ query: req.query, nbHits: products.length, products });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
