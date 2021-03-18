const express = require("express")
const app = express()
const productsRouter = require("./routes/products")
const serpWowRouter = require("./routes/serpWowRouter")
const logggerMiddleware = require("./middlewares/logger.js")
const path = require("path")

app.use("/static", express.static("dist"))

app.use((req, res, next) => {
    res.set("Access-Control-Allow-Origin", "*")
    next()
})
app.use(logggerMiddleware)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "dist/index.html"))
})
app.use("/products", productsRouter)
app.use("/serpwow", serpWowRouter)

app.listen(process.env.PORT, () => {
    console.log("server is listening...")
})
