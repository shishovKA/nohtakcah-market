<template>
    <div>
        <v-row v-for="(productsRow, i) in productsGrid" :key="i">
            <v-col v-for="(product, j) in productsRow" :key="j" cols="4">
                <Product :product="product" />
            </v-col>
        </v-row>
    </div>
</template>

<script>
import Product from "../components/Product.vue"

export default {
    name: "ProductGrid",
    props: ["products"],
    components: { Product },
    computed: {
        productsGrid() {
            let productsGrid = []

            for (let i = 0; i < this.products.length; i += 3) {
                const productsRow = []
                for (let j = i; j < this.products.length && j < i + 3; j++) {
                    productsRow.push(this.products[j])
                }
                productsGrid.push(productsRow)
            }

            return productsGrid
        },
    },
}
</script>
