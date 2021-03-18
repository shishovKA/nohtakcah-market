const express = require("express")
const router = express.Router()

const { sendSerpWowReq } = require("../controllers/serpWow")
// add route for SerpWow Req
router.get("/:searchtext", sendSerpWowReq)

router.use((err, req, res, next) => {
    res.status(500).send()
})

module.exports = router
