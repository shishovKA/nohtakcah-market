const { JSDOM } = require("jsdom")

class PriceruProductsParser {
    constructor(html) {
        this.html = html
        this.dom = null
    }

    getProducts() {
        this.#createInstance()

        return this.#parseProducts()
    }

    getOffers() {
        this.#createInstance()

        return this.#parseOffers()
    }

    #createInstance() {
        if (this.dom) return
        if (typeof this.html !== "string") throw new Error()

        this.dom = this.#createDom()
    }

    #createDom() {
        return new JSDOM(this.html)
    }

    get #document() {
        return this.dom.window.document
    }

    #parseProducts() {
        const contentSelectors = ["article"]
        let productsContent

        for (let i = 0; i < contentSelectors.length; i++) {
            productsContent = this.#document.querySelectorAll(
                contentSelectors[i],
            )

            if (productsContent.length) break
        }

        if (productsContent?.length) {
            return Array.from(productsContent).map(
                this.#parseProduct.bind(this),
            )
        } else {
            return []
        }
    }

    #parseProduct(productContent) {
        const product = {}
        const processFuncs = [
            this.#processTitleText,
            this.#processImgSrc,
            this.#processPrice,
            this.#processShopCount,
            this.#processSiteName,
            this.#processSiteLink,
            this.#processOffersLink,
        ]

        for (const processFunc of processFuncs) {
            try {
                const [key, value] = processFunc(productContent)

                product[key] = value
            } catch (e) {}
        }

        return product
    }

    #processTitleText(productContent) {
        const productTitle = productContent.querySelector(".b-item__title")
        const productTitleText = productTitle.textContent

        console.log(productTitleText)
        return ["productTitleText", productTitleText]
    }

    #processImgSrc(productContent) {
        const productImg = productContent.querySelectorAll("img")[1]

        if (!productImg) return ["productImgSrc", null]

        return ["productImgSrc", productImg.src]
    }

    #processPrice(productContent) {
        const productPrice = productContent.querySelector(".b-price a")
            .textContent

        return ["productPrice", productPrice]
    }

    #processShopCount(productContent) {
        const watchPrice = productContent.querySelector(".b-button-yellow")

        if (watchPrice) {
            const productShopCount = productContent.querySelector(
                ".b-item__link-shop",
            )
            const productShopCountText = productShopCount.textContent

            return ["productShopCount", productShopCountText]
        } else {
            return ["productShopCount", null]
        }
    }

    #processSiteName(productContent) {
        const shopLink = productContent.querySelector(".b-button-pink")

        if (shopLink) {
            const productSiteChip = productContent.querySelector(
                ".b-item__link-shop a",
            )
            const productSiteName = productSiteChip.textContent

            return ["productSiteName", productSiteName]
        } else {
            return ["productSiteName", null]
        }
    }

    #processSiteLink(productContent) {
        const shopLink = productContent.querySelector(".b-button-pink")

        if (shopLink) {
            const productSiteLinkBase64 = shopLink.dataset.sitelink
            const productSiteLinkBuff = Buffer.from(
                productSiteLinkBase64,
                "base64",
            )
            let productSiteLink = productSiteLinkBuff.toString("utf-8")

            productSiteLink = "https://price.ru" + productSiteLink

            return ["productSiteLink", productSiteLink]
        } else {
            return ["productSiteLink", null]
        }
    }

    #processOffersLink(productContent) {
        const offersLink = productContent.querySelector(".b-button-yellow")

        if (offersLink) {
            const productOffersLink = offersLink.dataset.hidelink

            return ["productOffersLink", productOffersLink]
        } else {
            return ["productOffersLink", null]
        }
    }

    #parseOffers() {
        const offers = this.#document.querySelectorAll(
            "article.b-list-viewtable__item",
        )

        return Array.from(offers).map(this.#parseOffer.bind(this))
    }

    #parseOffer(offerContent) {
        const offer = {}
        const processFuncs = [
            this.#processOfferPrice,
            this.#processOfferShopName,
            this.#processOfferShopLink,
        ]

        for (const processFunc of processFuncs) {
            try {
                const [key, value] = processFunc(offerContent)

                offer[key] = value
            } catch (e) {}
        }

        return offer
    }

    #processOfferPrice(offerContent) {
        const offerPrice = offerContent.querySelector(".b-price a").textContent

        return ["offerPrice", offerPrice]
    }

    #processOfferShopName(offerContent) {
        const shopLink = offerContent.querySelector(
            ".b-list-viewtable__item-title-shoplink",
        )
        console.log(shopLink)
        const shopName = shopLink.textContent
        console.log(shopName)

        return ["offerShopName", shopName]
    }

    #processOfferShopLink(offerContent) {
        const shopLink = offerContent.querySelector(".b-button-pink")
        const shopLinkBase64 = shopLink.dataset.sitelink
        const shopLinkBuff = Buffer.from(shopLinkBase64, "base64")
        let offerShopLink = shopLinkBuff.toString("utf-8")

        offerShopLink = "https://price.ru" + offerShopLink
        return ["offerShopLink", offerShopLink]
    }
}

module.exports = {
    PriceruProductsParser,
}
