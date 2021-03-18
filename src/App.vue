<template>
    <v-app>
        <v-app-bar app color="#7D859F" flat dark height="106">
            <v-toolbar-title class="flex-shrink-0 mr-2">
                <router-link to="/" class="text-decoration-none">
                    <h1 class="white--text text-h6 text-sm-h4">
                        Находка.ru
                    </h1>
                </router-link>
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-text-field
                @keypress.enter="searchProduct"
                v-model="valueForSearch"
                bar
                rounded
                solo
                background-color="#fff"
                color="#000"
                light
                label="Искать товар"
                hide-details
                :loading="searchLoading"
                :disabled="searchLoading"
            >
            </v-text-field>
            <v-btn icon class="ml-2" @click="searchProduct">
                <v-icon>mdi-magnify</v-icon>
            </v-btn>

            <v-spacer></v-spacer>

            <router-link to="/Saved" class="text-decoration-none">
                <v-btn icon>
                    <v-icon>mdi-heart</v-icon>
                </v-btn>
            </router-link>
        </v-app-bar>

        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>

<script>
export default {
    name: "App",
    data() {
        return {
            valueForSearch: null,
            searchLoading: false,
        }
    },
    methods: {
        searchProduct() {
            if (this.$router.currentRoute.path !== "/") {
                this.$router.push("/")
            }
            this.searchLoading = true

            this.$store.commit("setLastSearch", this.valueForSearch)
            this.$store.commit("clearProducts")
            this.$store
                .dispatch("searchProduct", this.valueForSearch)
                .then(() => {
                    this.searchLoading = false
                })
        },
    },
}
</script>

<style scoped>
.router-link-active {
    font-weight: bold;
}
</style>
