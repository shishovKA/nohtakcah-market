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
		const contentSelectors = ["article"]
		let productsContent

		for (let i = 0; i < contentSelectors.length; i++) {
			productsContent = this.#document.querySelectorAll(
				contentSelectors[i]
			)

			if (productsContent.length) break
		}

		if (productsContent?.length) {
			return Array.from(productsContent).map(
				this.#parseProduct.bind(this)
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
			this.#processSiteLink
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
		const productPrice = productContent.querySelector(".b-price")
			.textContent

		return ["productPrice", productPrice]
	}

	#processShopCount(productContent) {
		const productShopCount = productContent.querySelector(
			".b-item__link-shop"
		)
		const productShopCountText = productShopCount.textContent

		return ["productShopCount", productShopCountText]
	}

	#processSiteName(productContent) {
		const productPriceContainer = productContent.querySelector("span")
		const productSiteName =
			productPriceContainer.nextElementSibling.textContent

		return ["productSiteName", productSiteName]
	}

	#processSiteLink(productContent) {
		const productPriceContainer = productContent.querySelector("span")
		let productSiteLink = productPriceContainer.nextElementSibling.href

		productSiteLink = "https://www.google.com" + productSiteLink

		return ["productSiteLink", productSiteLink]
	}
}

module.exports = {
	GoogleGoodsParser
}
