<template>
    <v-app>
        <v-app-bar app color="#7D859F" flat dark height="106">
            <v-toolbar-title>Находка.ru</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-text-field
                @keypress.enter="searchProduct"
                v-model="valueForSearch"
                bar
                rounded
                solo
                append-icon="mdi-magnify"
                background-color="#fff"
                color="#000"
                light
                label="Искать товар"
                hide-details
                :loading="searchLoading"
                :disabled="searchLoading"
            >
            </v-text-field>

            <v-spacer></v-spacer>

            <router-link to="/Saved">
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
