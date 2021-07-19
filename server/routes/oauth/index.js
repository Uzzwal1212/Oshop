const express = require("express")
const router = express.Router()
const googleAuthRouter = require('./google')

router.use("/google", googleAuthRouter)

module.exports = router