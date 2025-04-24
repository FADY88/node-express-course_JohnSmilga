// used just with files from 08 to 10 in final folder

// req => middleware => res
const logger = (req, res, next) => {
  const time = new Date().getFullYear();
  console.log(req.method, req.url, time);
  console.log("###");
  next();
};

module.exports = logger;
