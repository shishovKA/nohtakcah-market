const express = require("express")
const router = express.Router()
const { priceruClient, genParamsForSearch } = require("../priceru-client")
const { PriceruProductsParser } = require("../priceru-products-parser")
const { writeFileSync } = require("fs")

router.get("/", (req, res, next) => {
    const searchItem = req.query.search
    const searchPage = req.query.page

    priceruClient(genParamsForSearch(searchItem, searchPage))
        .then((gRes) => {
            if (gRes.status === 200) {
                const googleProductsParser = new PriceruProductsParser(
                    gRes.data,
                )
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
