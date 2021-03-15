const { JSDOM } = require("jsdom")

class GoogleGoodsParser {
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
		const productTitleLinks = this.#document.querySelectorAll(
			".VQN8fd.translate-content"
		)

		return Array.from(productTitleLinks).map(this.#parseProduct.bind(this))
	}

	#parseProduct(link) {
        const product = {}
		const processFuncs = [
			this.#processTitleText,
			this.#processImgSrc,
			this.#processPrice,
			this.#processSiteName,
			this.#processSiteLink
		]

        for (const processFunc of processFuncs) {
            try {
                const [key, value] = processFunc(link)

                product[key] = value
            } catch(e) {}
        }

		return product
	}

	#processTitleText(link) {
		const productTitle = link.querySelector("h4")
		const productTitleText = productTitle.textContent

        return ["productTitleText", productTitleText]
	}

	#processImgSrc(link) {
		const productImg = link.previousElementSibling.querySelector("img")
		const productImgSrc = productImg.src

        return ["productImgSrc", productImgSrc]
	}

	#processPrice(link) {
		const productParams = link.parentElement.lastElementChild
		const productPrice = productParams.querySelector("span span").textContent

        return ["productPrice", productPrice]
	}

	#processSiteName(link) {
		const productParams = link.parentElement.lastElementChild
		const productSiteName = productParams.querySelector("a").textContent

        return ["productSiteName", productSiteName]
	}

	#processSiteLink(link) {
		const productParams = link.parentElement.lastElementChild
		const productSiteLink = productParams.querySelector("a").href

        return ["productSiteLink", productSiteLink]
	}
}

module.exports = {
	GoogleGoodsParser
}
