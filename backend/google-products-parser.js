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
		const pageTypes = ["common", "brand"]
		const contentSelectors = [".sh-dlr__content", ".sh-dgr__content"]
		let productsContent, pageType

		for (let i = 0; i < contentSelectors.length; i++) {
			pageType = pageTypes[i]
			productsContent = this.#document.querySelectorAll(contentSelectors[i])

			if (productsContent.length) break
		}

		if (productsContent?.length) {
			return Array.from(productsContent).map(
				this.#parseProduct.bind(this, pageType)
			)
		} else {
			return []
		}
	}

	#parseProduct(type, productContent) {
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
				const [key, value] = processFunc(type, productContent)

				product[key] = value
			} catch (e) {}
		}

		return product
	}

	#processTitleText(type, productContent) {
		const productTitle = productContent.querySelector("h4, h3")
		const productTitleText = productTitle.textContent

		return ["productTitleText", productTitleText]
	}

	#processImgSrc(type, productContent) {
		const productImg = productContent.querySelector("img")
		const productImgSrc = productImg.src

		return ["productImgSrc", productImgSrc]
	}

	#processPrice(type, productContent) {
		const productPrice = productContent.querySelector("span span")
			.textContent

		return ["productPrice", productPrice]
	}

	#processSiteName(type, productContent) {
		if (type === "common") {
			const productPriceContainer = productContent.querySelector("span")
			const productSiteName =
				productPriceContainer.nextElementSibling.textContent

			return ["productSiteName", productSiteName]
		} else if (type === "brand") {
			const productOffer = productContent.querySelector(
				".sh-dgr__offer-content"
			)
			const productSiteName = productOffer.querySelector("a").textContent

			return ["productSiteName", productSiteName]
		}
	}

	#processSiteLink(type, productContent) {
		if (type === "common") {
			const productPriceContainer = productContent.querySelector("span")
			let productSiteLink =
				productPriceContainer.nextElementSibling.href
			
			productSiteLink = "https://www.google.com" + productSiteLink

			return ["productSiteLink", productSiteLink]
		} else if (type === "brand") {
			const productOffer = productContent.querySelector(
				".sh-dgr__offer-content"
			)
			let productSiteLink = productOffer.querySelector("a").href
			
			productSiteLink = "https://www.google.com" + productSiteLink
			console.log(productSiteLink)

			return ["productSiteLink", productSiteLink]
		}
	}
}

module.exports = {
	GoogleGoodsParser
}
