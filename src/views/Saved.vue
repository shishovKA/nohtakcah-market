<template>
    <v-container>
        <v-row class="text-center">
            <v-col class="mt-4 mb-4">
                <h1 class="display-2 font-weight-bold">
                    Сохраненные товары
                </h1>
            </v-col>
        </v-row>
        <ProductGrid :products="bookmarks" />
    </v-container>
</template>

<script>
import ProductGrid from "../components/ProductGrid.vue"

export default {
    name: "Saved",
    components: { ProductGrid },
    mounted() {
        this.$store.commit("importBookmarks")
    },
    computed: {
        bookmarks() {
            return this.$store.state.bookmarks
        },
    },
}
</script>
