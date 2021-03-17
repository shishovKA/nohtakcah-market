import axios from "axios"

const httpClient = axios.create({
    baseURL: "http://localhost:8000",
})

export function getProducts(productName) {
    return httpClient("/products", {
        params: { search: productName },
    })
        .then((res) => res.data)
        .catch((err) => console.log(err))
}
