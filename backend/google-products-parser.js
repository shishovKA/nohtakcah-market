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
		const goodsTitleLinks = this.#document.querySelectorAll(
			".VQN8fd.translate-content"
		)

		return Array.from(goodsTitleLinks).map(this.#parseProduct.bind(this))
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
		const goodsTitle = link.querySelector("h4")
		const goodsTitleText = goodsTitle.textContent

        return ["goodsTitleText", goodsTitleText]
	}

	#processImgSrc(link) {
		const goodsImg = link.previousElementSibling.querySelector("img")
		const goodsImgSrc = goodsImg.src

        return ["goodsImgSrc", goodsImgSrc]
	}

	#processPrice(link) {
		const goodsParams = link.parentElement.lastElementChild
		const goodsPrice = goodsParams.querySelector("span span").textContent

        return ["goodsPrice", goodsPrice]
	}

	#processSiteName(link) {
		const goodsParams = link.parentElement.lastElementChild
		const goodsSiteName = goodsParams.querySelector("a").textContent

        return ["goodsSiteName", goodsSiteName]
	}

	#processSiteLink(link) {
		const goodsParams = link.parentElement.lastElementChild
		const goodsSiteLink = goodsParams.querySelector("a").href

        return ["goodsSiteLink", goodsSiteLink]
	}
}

module.exports = {
	GoogleGoodsParser
}
