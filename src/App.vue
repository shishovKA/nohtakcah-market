<template>
  <v-app>
    <v-app-bar
      color="#7D859F"
      flat
      app
    >
      
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  
  data: () => ({
    //
  }),
};
</script>
