<template>
  <v-container>
    <v-row class="text-center">

      <v-col class="mb-4 mt-3">
        <h1 class="display-2 font-weight-bold mb-3">
          НАЙДЕМ ВСЕ И ПО ВЫГОДНОЙ ЦЕНЕ!
        </h1>
      </v-col>

      <v-container>
        <v-row v-for="(productsRow, i) in productsGrid" :key="i">
          <v-col v-for="(product, j) in productsRow" :key="j" cols="4">
            <v-hover v-slot="{ hover }">
              <v-card :elevation="hover ? 16 : 4" class="transition-swing product-card">
                <div>
                  <div class="product-img-container">
                    <img :src="product.productImgSrc" class="product-img">
                  </div>
                  <v-card-title class="product-title"> {{ product.productTitleText }} </v-card-title>
                </div>
                <div>
                  <v-divider class="mx-4"></v-divider>
                  <v-card-actions>
                    <v-chip color="indigo" text-color="white">{{ product.productPrice }}</v-chip>
                    <v-chip color="indigo" text-color="white" class="ml-2">
                      {{ product.productShopCount }}
                    </v-chip>
                    <v-btn
                      plain color="indigo" 
                      v-if="product.productSiteLink"
                      :href="product.productSiteLink"
                    >
                      {{ product.productSiteName }}
                    </v-btn>
                  </v-card-actions>
                </div>
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

</style>