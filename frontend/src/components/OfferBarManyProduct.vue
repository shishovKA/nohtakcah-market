<template>
    <div>
        <v-progress-linear
            :active="offersLoading"
            :indeterminate="offersLoading"
            absolute
            bottom
            color="deep-purple accent-4"
        ></v-progress-linear>
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
                <v-card-text
                    v-for="(offer, i) in offers"
                    :key="i"
                    class="d-flex pb-1 pt-1 align-center"
                >
                    <div class="font-weight-bold">{{ offer.offerPrice }}</div>
                    <v-spacer></v-spacer>
                    <v-btn
                        plain
                        color="indigo"
                        v-if="offer.offerShopLink"
                        :href="offer.offerShopLink"
                        class="pr-0"
                    >
                        {{ offer.offerShopName || "В магазин" }}
                    </v-btn>
                </v-card-text>
            </div>
        </v-expand-transition>
    </div>
</template>

<script>
import { getOffers } from "../api"

export default {
    props: ["product"],
    data() {
        return {
            showShopOffers: false,
            offers: [],
            offersLoading: false,
        }
    },
    methods: {
        reverseShowShopOffers() {
            if (this.offersLoading == true) return 
            
            this.showShopOffers = !this.showShopOffers

            if (this.showShopOffers && this.offers.length === 0) {
                this.offersLoading = true

                getOffers(this.product.productOffersLink).then((offers) => {
                    this.offers = offers
                    this.offersLoading = false
                })
            }
        },
    },
}
</script>
