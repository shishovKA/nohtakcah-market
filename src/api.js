import axios from "axios"

const httpClient = axios.create({
    baseURL: "http://localhost:8000",
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
