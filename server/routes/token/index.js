const express = require("express");

const router = express.Router()
const verifyTokenRouter = require('./verify')

router.use("/verifyToken", verifyTokenRouter)

module.exports = router
