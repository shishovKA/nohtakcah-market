<template>
    <v-container>
        <v-row class="text-center">
            <v-col class="mt-4 mb-4">
                <h1 class="display-2 font-weight-bold">
                    Найдем все и по выгодной цене!
                </h1>
            </v-col>

            <v-container>
                <v-row v-for="(productsRow, i) in productsGrid" :key="i">
                    <v-col
                        v-for="(product, j) in productsRow"
                        :key="j"
                        cols="4"
                    >
                        <v-hover
                            v-slot="{ hover }"
                            v-if="product.productImgSrc"
                        >
                            <v-card
                                :elevation="hover ? 16 : 4"
                                class="transition-swing product-card"
                            >
                                <div>
                                    <div class="product-img-container">
                                        <img
                                            :src="product.productImgSrc"
                                            class="product-img"
                                        />
                                    </div>
                                    <v-card-title class="product-title">
                                        {{ product.productTitleText }}
                                    </v-card-title>
                                </div>
                                <div>
                                    <v-divider class="mx-4"></v-divider>
                                    <component
                                        :is="chooseOfferBar(product)"
                                        :product="product"
                                    ></component>
                                </div>
                            </v-card>
                        </v-hover>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-btn
                            v-if="products.length"
                            class="mt-3 mb-3"
                            @click="loadMore"
                            >Загрузить еще</v-btn
                        >
                    </v-col>
                </v-row>
            </v-container>
        </v-row>
    </v-container>
</template>

<script>
import OfferBarOneProduct from "../components/OfferBarOneProduct.vue"
import OfferBarManyProduct from "../components/OfferBarManyProduct.vue"

export default {
    name: "Home",
    components: { OfferBarOneProduct, OfferBarManyProduct },
    data() {
        return {}
    },
    computed: {
        products() {
            return this.$store.state.products
        },
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
    methods: {
        chooseOfferBar(product) {
            if (product.productShopCount) {
                return "OfferBarManyProduct"
            } else {
                return "OfferBarOneProduct"
            }
        },
        loadMore() {
            this.$store.dispatch("loadMore")
        },
    },
}
</script>

<style scoped>
.product-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 400px;
}

.product-title {
    word-break: normal;
}

.product-img-container {
    height: 200px;
    padding-top: 20px;
}

.product-img {
    max-height: 180px;
}
</style>
