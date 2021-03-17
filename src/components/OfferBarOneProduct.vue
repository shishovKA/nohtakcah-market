<template>
    <v-card-actions>
        <v-chip color="indigo" text-color="white">{{
            product.productPrice
        }}</v-chip>
        <v-chip
            v-if="product.productShopCount"
            color="indigo"
            text-color="white"
            class="ml-2"
        >
            {{ product.productShopCount }}
        </v-chip>
        <v-btn
            plain
            color="indigo"
            v-if="product.productSiteLink"
            :href="product.productSiteLink"
        >
            {{ product.productSiteName }}
        </v-btn>
    </v-card-actions>
</template>

<script>
export default {
    props: ["product"]
};
</script>
