const express = require("express");
const bodyparser = require("body-parser");
const dataBase = require("./tools/mysql");
const apiRouter = require("./routers/apiRouter");
const backendRouter = require("./routers/backendRouter");
const viewsRouter = require("./routers/viewsRouter");
dataBase.Main();
require("dotenv").config();

var app = express();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(express.static("public"));
app.use("/api/", apiRouter);
app.use("/", backendRouter);
app.use(viewsRouter);

app.set("view engine", "ejs");

app.listen(process.env.PORT || 3000);
