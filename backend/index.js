const express = require("express")
const app = express()
const productsRouter = require("./routes/products")
const logggerMiddleware = require("./middlewares/logger.js")

app.use(logggerMiddleware)
app.use("/products", productsRouter)

app.listen(8000, () => {
	console.log("server is listening...")
})
