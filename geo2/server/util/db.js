const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
let isConnected;

const DB_URL =
  "mongodb://erinmori26:Pooperscooper1252@cluster0-shard-00-00-ds4lf.mongodb.net:27017,cluster0-shard-00-01-ds4lf.mongodb.net:27017,cluster0-shard-00-02-ds4lf.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority";

const connectToDatabase = () => {
  if (isConnected) {
    console.log("Use existing database connection.");
    return Promise.resolve();
  }

  console.log("Using new database connection.");
  return mongoose.connect(DB_URL, { useNewUrlParser: true }).then(db => {
    isConnected = db.connections[0].readyState;
  });
};

module.exports = connectToDatabase;
