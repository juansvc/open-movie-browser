
<!--  
Vue Js Frontend Task Using the Open Movie Database.
Author Juan Sebastian Vivanco Castro
@github juansvc
Title: Giffits - Eng. Juan Vivanco
-->

<template>
<!-- containter to present while handling data -->
<v-container v-if="loading">
    <div class="text-xs-center">
      <v-progress-linear indeterminate color="green"></v-progress-linear>
    </div>
  </v-container>
<!-- containter to present if no data -->
  <v-container v-else-if="data === false">
    <div class="text-xs-center">
      <h2>Sorry, not found {{ this.name }}</h2>
    </div>
  </v-container >
<!-- container when data ready -->
  <v-container v-else grid-list-xl>
    <v-container fluid>
        <!-- data iterator for sorting movies by year, title, and imbdapi -->
        <v-data-iterator :items="items" :sort-by="sortBy" :sort-desc="sortDesc" hide-default-footer>
        <template v-slot:header>
          <v-toolbar dark color="green darken-3" class="mb-1">
            <template v-if="$vuetify.breakpoint.mdAndUp">
              <v-spacer></v-spacer>
              <v-select
                v-model="sortBy"
                flat
                solo-inverted
                hide-details
                :items="keys"
                label="Sort by"
              ></v-select>
              <v-spacer></v-spacer>
              <v-btn-toggle v-model="sortDesc" mandatory>
                <v-btn large depressed color="green" :value="false">
                  <v-icon>mdi-arrow-up</v-icon>
                </v-btn>
                <v-btn large depressed color="green" :value="true">
                  <v-icon>mdi-arrow-down</v-icon>
                </v-btn>
              </v-btn-toggle>
            </template>
          </v-toolbar>
        </template>

        <template v-slot:default="props">
          <v-row>
            <v-col v-for="item in props.items" :key="item.Title" cols="12" sm="1" md="3" lg="4">
              <!-- Movie cards -->
              <v-card>
                <v-img :src="item.Poster" aspect-ratio="1.5"></v-img>
                <!-- Movie title -->
                <v-card-title class="subheading font-weight-bold">
                  {{
                  item.Title
                  }}
                </v-card-title>
                <v-divider></v-divider>
                <!-- Order list by selected option year, title, or imbdapi -->
                <v-list dense>
                <v-card-text>
                    <div v-for="(key, index) in filteredKeys" :key="index">
                      <span :class="{ 'green--text': sortBy === key }">{{ key }}:</span>
                      <span
                        class="align-end"
                        :class="{ 'green--text': sortBy === key }"
                      >{{ item[key] }}</span>
                    </div>
                    <div class="body-2">Type: {{ item.Type }}</div>
                </v-card-text>
                </v-list>
                <v-card-actions class="justify-center">
                    <!-- View movie info button -->
                  <v-btn text outlined color="green" x-large @click="movie(item.imdbID)">View</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </template>

        <template v-slot:footer></template>
        </v-data-iterator>
    </v-container>
  </v-container>
</template>

<script>
import api from "../api";
export default {
    // string sent by click on search buttom from index
  props: ["search"],
  data() {
    return {
      items: [],
      loading: true,
      data: false,
      filter: {},
      sortDesc: false,
      sortBy: "Title",
      keys: ["Title", "Year", "imdbID"]
    };
  },
  //Filter or sort at component mounted by Movie titles
  computed: {
    filteredKeys() {
      return this.keys.filter(key => key !== `Title`);
    }
  },
  methods: {
    movie(id) {
      this.$router.push("/movie/" + id);
    }
  },
  mounted() {
    api
      .fetchmovies(this.search)
      .then(res => {
        if (res.Response === "True") {
          this.items = res.Search;
          this.loading = false;
          this.data = true;
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>
