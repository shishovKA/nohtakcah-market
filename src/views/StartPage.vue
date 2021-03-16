<template>
  <v-container>
    <v-row class="text-center">

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Start Page
        </h1>
      </v-col>

      <v-container>
        <v-row v-for="(productsRow, i) in productsGrid" :key="i">
          <v-col v-for="(product, j) in productsRow" :key="j" cols="4">
            <v-hover v-slot="{ hover }">
              <v-card :elevation="hover ? 16 : 4" class="transition-swing" :height="400">
                <img :src="product.productImgSrc"/>
                <v-card-title> {{ product.productTitleText }} </v-card-title>
                <v-divider class="mx-4"></v-divider>
                <v-card-actions>
                  <v-chip color="indigo" text-color="white">{{ product.productPrice }}</v-chip>
                  <v-btn plain color="indigo" :href="product.productSiteLink">
                    {{ product.productSiteName }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </v-container>
      
      
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'Start',

    data() {
      return {}
    },
    mounted() {
      console.log(this.$store.dispatch)
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

        console.log(productsGrid)
        return productsGrid 
      }
    }    
  }
</script>
