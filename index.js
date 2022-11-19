require("dotenv").config();
const express = require("express");
const sequelize = require("./db/index");
const bodyParser = require("body-parser");
const router = require("./routers/index");

const app = express();

app.use(bodyParser.json());
app.use("/", router);

const start = async () => {
  try {
    app.listen(process.env.PORT, () => {
      console.log(`Server listening on ${process.env.PORT}`);
    });
    await sequelize.authenticate();
    console.log("Database successfully created");
  } catch (err) {
    console.log(err);
  }
};

start();
