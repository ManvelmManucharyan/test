require("dotenv").config();
const express = require("express");
var cookieParser = require("cookie-parser");
const cors = require("cors");
const sequelize = require("./db/index");
const router = require("./routers/index");

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: "*" }));
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