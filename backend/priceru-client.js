const axios = require("axios")

const priceruClient = axios.create({
    baseURL: "https://price.ru/search",
    timeout: 5000,
    headers: {
        "user-agent":
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36",
        "accept-language": "en,ru-RU;q=0.9,ru;q=0.8",
    },
})

const genParamsForSearch = (textForSearch) => {
    return { params: { query: textForSearch } }
}

module.exports = {
    priceruClient,
    genParamsForSearch,
}
