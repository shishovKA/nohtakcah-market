const express = require("express")
const router = express.Router()
const { priceruClient, genParamsForSearch } = require("../priceru-client")
const { PriceruProductsParser } = require("../priceru-products-parser")
const { writeFileSync } = require("fs")

router.get("/", (req, res, next) => {
    const searchItem = req.query.search
    const searchPage = req.query.page

    priceruClient("/search", genParamsForSearch(searchItem, searchPage))
        .then((gRes) => {
            if (gRes.status === 200) {
                const priceruProductsParser = new PriceruProductsParser(
                    gRes.data,
                )
                const products = priceruProductsParser.getProducts()
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

router.get("/offers", (req, res, next) => {
    const offersLink = req.query.offer
    console.log(offersLink)
    priceruClient(offersLink)
        .then((gRes) => {
            // console.log(gRes)
            if (gRes.status === 200) {
                const priceruProductsParser = new PriceruProductsParser(
                    gRes.data,
                )
                const offers = priceruProductsParser.getOffers(offersLink)
                console.log(offers)
                const jsonOffers = JSON.stringify(offers)

                res.send(jsonOffers)
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
