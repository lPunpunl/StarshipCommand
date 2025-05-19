const express = require("express");
const agenda = require("../controllers/agenda");
const { authUser } = require('../middleware/auth');

const api = express.Router();

api.post("/agenda/create", [authUser], agenda.createActivity);
api.delete("/agenda/delete/:_id", [authUser], agenda.deleteActivity);
api.patch("/agenda/update", [authUser], agenda.updateActivity);
api.get("/agenda/searchday", [authUser], agenda.getActivityByDay);
api.get("/agenda/searchmonth", [authUser], agenda.getActivityByMonth);

module.exports = api;