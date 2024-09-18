const router = require("express").Router()
const ProfileController = require("../../controllers/UserController")
const TestRoute = require('../api/TestRoute');
const UserRoute = require('../api/UserRoute');

module.exports = {
  TestRoute,
  UserRoute,
  ProfileController,
  router,
};

module.exports.Router
