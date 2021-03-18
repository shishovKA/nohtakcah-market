const express = require("express")
const app = express()
const productsRouter = require("./routes/products")
const serpWowRouter = require("./routes/serpWowRouter")
const logggerMiddleware = require("./middlewares/logger.js")

app.use((req, res, next) => {
    res.set("Access-Control-Allow-Origin", "*")
    next()
})
app.use(logggerMiddleware)
app.use("/products", productsRouter)
app.use("/serpwow", serpWowRouter)

app.listen(3000, () => {
    console.log("server is listening...")
})
