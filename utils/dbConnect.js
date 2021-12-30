/*eslint-disable*/

import mongoose from "mongoose";

const connection = {};

(async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    connection.isConnected = db.connections[0].readyState;

    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
  }
})();

import { Sequelize } from "sequelize";

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize("smartnft", "postgres", "1234", {
  host: "localhost",
  dialect: "postgres",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", error);
  });

module.exports = sequelize;
