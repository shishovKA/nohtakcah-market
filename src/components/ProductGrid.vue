<template>
    <div>
        <v-row>
            <v-col v-for="(product, i) in products" :key="i" xs="12" sm="6" md="6" lg="4" xl="3">
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
}
</script>
