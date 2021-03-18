import axios from "axios"

const serverUrl = process.env.NODE_ENV === "production" ? "https://nohtakcah-market-back.tk" : "http://localhost:3000";

const httpClient = axios.create({
    baseURL: serverUrl,
})

export function getProducts(productName, pageSearch) {
    return httpClient("/products", {
        params: { search: productName, page: pageSearch },
    })
        .then((res) => res.data)
        .catch((err) => console.log(err))
}

export function getOffers(offersLink) {
    return httpClient("/products/offers", {
        params: { offer: offersLink },
    })
        .then((res) => res.data)
        .catch((err) => console.log(err))
}
