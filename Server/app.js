const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config({ path: ".env" });

const app = express();

//configure body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//import routings
const agendaRoutes = require("./router/agenda");
const userRoutes = require("./router/user")
const authRoutes = require("./router/auth")

//configure header http - cors
app.use(cors());

//configure routings
app.use(`/api/${process.env.API_VERSION}`, agendaRoutes)
app.use(`/api/${process.env.API_VERSION}`, userRoutes)
app.use(`/api/${process.env.API_VERSION}`, authRoutes)


module.exports = app;

