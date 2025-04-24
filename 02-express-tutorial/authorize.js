// used just with files from 08 to 10 in final folder

const authorize = (req, res, next) => {
  const { name } = req.query;
  if (!name) {
    return res.status(401).send("Not authorized");
  }
  console.log("authorize");
  req.user = { name: name, id: 3 };
  next();
};

module.exports = authorize;
