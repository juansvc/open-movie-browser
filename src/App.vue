<template>
  <v-app>
     <v-app-bar app>
       <!-- Title toolbar -->
      <v-toolbar-title class="headline text-uppercase">
        <h3>Giffits - Eng. Juan Vivanco</h3>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-flex sm="3" md="2">
        <!-- Search text field -->
        <v-text-field
          outlined
          color="green"
          dense
          class="mt-6 mx-auto"
          label="Type a Movie Name or Actor"
          v-model="search"
        ></v-text-field>
      </v-flex>
      <!-- Search button -->
      <v-btn text color="green" large @click="search" @keyup.enter.native="search">
        <v-icon>mdi-magnify</v-icon>Search
      </v-btn>
    </v-app-bar>

    <v-content>
      <!-- Use router for view -->
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
  },

  // String to send for search
  data() {
    return {
      search: ""
    };
  },
  // Methon for search movies
  methods: {
    search() {
      this.search = "";
    }
  }
};
</script>
