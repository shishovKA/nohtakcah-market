<template>
    <v-hover v-slot="{ hover }" v-if="product.productImgSrc">
        <v-card
            :elevation="hover ? 16 : 4"
            class="transition-swing product-card"
        >
            <v-btn
                icon
                class="bookmark-icon"
                large
                @click="bookmarkClick"
                :color="bookmarkColors"
            >
                <v-icon class="">mdi-book</v-icon>
            </v-btn>
            <div>
                <div class="product-img-container">
                    <img :src="product.productImgSrc" class="product-img" />
                </div>
                <v-card-title class="product-title">
                    {{ product.productTitleText }}
                </v-card-title>
            </div>
            <div>
                <v-divider class="mx-4"></v-divider>
                <component :is="chooseOfferBar" :product="product"></component>
            </div>
        </v-card>
    </v-hover>
</template>

<script>
import OfferBarOneProduct from "../components/OfferBarOneProduct.vue"
import OfferBarManyProduct from "../components/OfferBarManyProduct.vue"

export default {
    name: "Product",
    props: ["product"],
    components: { OfferBarOneProduct, OfferBarManyProduct },
    data() {
        return {
            isBookmark: false,
        }
    },
    mounted() {
        this.isBookmark = this.isBookmarkFunc()
    },
    computed: {
        chooseOfferBar() {
            if (this.product.productShopCount) {
                return "OfferBarManyProduct"
            } else {
                return "OfferBarOneProduct"
            }
        },
        bookmarkColors() {
            if (this.isBookmark) return "yellow darken-3"
            else return ""
        },
        bookmarks() {
            return this.$store.state.bookmarks
        },
    },
    methods: {
        isBookmarkFunc() {
            const bookmarks = this.bookmarks.filter(
                (bookmark) =>
                    bookmark.productTitleText === this.product.productTitleText,
            )

            return Boolean(bookmarks.length)
        },
        bookmarkClick() {
            this.isBookmark = !this.isBookmark

            if (this.isBookmark) {
                this.$store.commit("saveBookmark", this.product)
            } else {
                this.$store.commit("removeBookmark", this.product)
            }
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

.bookmark-icon {
    position: absolute;
    right: 5px;
    top: 5px;
}
</style>
