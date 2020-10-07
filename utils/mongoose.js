const mongoose = require("mongoose");
require("dotenv").config();

module.exports = {
  init: () => {
    const dbOptions = {
      useNewUrlParser: true,
      autoIndex: false,
      useUnifiedTopology: true, 
    };

    mongoose.connect(process.env.MONGO_URI, dbOptions);
    mongoose.set("useFindAndModify", false);
    mongoose.Promise = global.Promise;

    const conn = mongoose.connection;
    conn.on("connected", () => console.log("connected"));
    conn.on("disconnected", () => console.warn("disconnected"));
    conn.on("error", (err) => console.error(err));
  },
};
