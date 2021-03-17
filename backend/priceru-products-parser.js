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

        return ["productTitleText", productTitleText]
    }

    #processImgSrc(productContent) {
        const productImg = productContent.querySelectorAll("img")[1]
        const productImgSrc = productImg.src

        return ["productImgSrc", productImgSrc]
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
            console.log("yes")
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
}

module.exports = {
    PriceruProductsParser,
}
