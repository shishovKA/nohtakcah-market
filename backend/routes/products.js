const express = require("express")
const router = express.Router()
const { googleClient, genParamsForSearch } = require("../google-client")
const {
	GoogleGoodsParser: GoogleProductsParser
} = require("../google-products-parser")
const { writeFileSync } = require("fs")

router.get("/", (req, res, next) => {
    const searchItem = req.query.search

	googleClient(genParamsForSearch(searchItem))
		.then((gRes) => {
			if (gRes.status === 200) {
				const googleProductsParser = new GoogleProductsParser(gRes.data)
				const products = googleProductsParser.getProducts()
				writeFileSync("index.html", gRes.data)
                console.log(products)
				const jsonProducts = JSON.stringify(products)

				res.send(jsonProducts)
				next()
			} else {
				next(new Error())
			}
		})
		.catch((err) => {
			next(err)
		})
})

router.use((err, req, res, next) => {
	res.status(500).send()
})

module.exports = router
