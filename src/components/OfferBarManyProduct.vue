<template>
    <v-card-actions>
        <v-chip color="indigo" text-color="white">{{
            product.productPrice
        }}</v-chip>
        <v-chip
            color="indigo"
            text-color="white"
            class="ml-2"
        >
            {{ product.productShopCount }}
        </v-chip>
        <v-spacer></v-spacer>
        <v-btn icon @click="reverseShowShopOffers">
            <v-icon>{{ showShopOffers ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
        </v-btn>
    </v-card-actions>
</template>

<script>
export default {
    props: ["product"],
    data() {
        return {
            showShopOffers: false
        }
    },
    methods: {
        reverseShowShopOffers() {
            this.showShopOffers = !this.showShopOffers
        }
    }
};
</script>
