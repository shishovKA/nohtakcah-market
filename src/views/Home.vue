<template>
    <v-container>
        <v-row class="text-center">
            <v-col class="mt-4 mb-4">
                <h1 class="display-2 font-weight-bold">
                    Найдем все и по выгодной цене!
                </h1>
            </v-col>

            <v-container>
                <ProductGrid :products="products"/>
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
import ProductGrid from "../components/ProductGrid.vue"

export default {
    name: "Home",
    components: { ProductGrid },
    computed: {
        products() {
            return this.$store.state.products
        },
    },
    methods: {
        loadMore() {
            this.$store.dispatch("loadMore")
        },
    },
}
</script>

<style scoped>

</style>
