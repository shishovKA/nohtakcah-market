<template>
    <div>
        <v-card-actions>
            <v-chip color="indigo" text-color="white">{{
                product.productPrice
            }}</v-chip>
            <v-chip color="indigo" text-color="white" class="ml-2">
                {{ product.productShopCount }}
            </v-chip>
            <v-spacer></v-spacer>
            <v-btn icon @click="reverseShowShopOffers">
                <v-icon>{{
                    showShopOffers ? "mdi-chevron-up" : "mdi-chevron-down"
                }}</v-icon>
            </v-btn>
        </v-card-actions>
        <v-expand-transition>
            <div v-show="showShopOffers">
                <v-divider></v-divider>

                <v-card-text>
                    I'm a thing. But, like most politicians, he promised more
                    than he could deliver. You won't have time for sleeping,
                    soldier, not with all the bed making you'll be doing. Then
                    we'll go with that data file! Hey, you add a one and two
                    zeros to that or we walk! You're going to do his laundry?
                    I've got to find a way to escape.
                </v-card-text>
            </div>
        </v-expand-transition>
    </div>
</template>

<script>
export default {
    props: ["product"],
    data() {
        return {
            showShopOffers: false,
        }
    },
    methods: {
        reverseShowShopOffers() {
            this.showShopOffers = !this.showShopOffers
        },
    },
}
</script>
