const { googleClient, genParamsForSearch}  = require("./google-client")
const { GoogleGoodsParser: GoogleProductsParser } = require("./google-products-parser")

googleClient(genParamsForSearch("adidas"))
	.then((res) => {
		console.log(res.request._header)
		console.log(res.headers, res.statusText, res.status)

		if (res.status === 200) {
			const googleProductsParser = new GoogleProductsParser(res.data)

			const products = googleProductsParser.getProducts()

			const jsonProducts = JSON.stringify(products)

			console.log(products)
		} else {
			throw new Error()
		}
	})
	.catch((err) => {
		console.log(err)
	})
