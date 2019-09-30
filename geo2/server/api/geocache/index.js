const app = require("../../util/configureApi");
const Cache = require("../../models/Cache");
const connectDB = require("../../util/db");

app.post("*", (req, res) => {
  connectDB()
    .then(() => {
      return Cache.create(req.body); // takes in body of request
    })
    .then(cacheItem => {
      res.status(200).json({
        // send result
        result: cacheItem
      });
    })
    .catch(error => {
      res.status(error.statusCode || 500).json({
        error: error.message
      });
    });
});

module.exports = app;
