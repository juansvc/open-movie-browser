<template>

<!-- Container and layout for movie cards -->
  <v-container grid-list-xl>
    <v-layout class="d-flex flex-wrap">
      <v-flex xs4 v-for="(item, index) in movies" :key="index">
          <!-- Movie cards -->
        <v-card>
          <v-img :src="item.Poster" aspect-ratio="1.5"></v-img>
        <!-- Movie title -->
          <v-card-title primary-title>
            <div>
              <h2 class="title">{{item.Title}}</h2>
            </div>
          </v-card-title>
          <v-divider></v-divider>
          <!-- Movie data -->
          <v-card-text>
            <div class="body-2">Year: {{item.Year}}</div>
            <div class="body-2">Type: {{item.Type}}</div>
            <div class="body-2">IMDB-id: {{item.imdbID}}</div>
          </v-card-text>
          <!-- View movie info -->
          <v-card-actions class="justify-center">
            <v-btn text x-large outlined color="green">View</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>
import api from "../api";

export default {
  data () {
    return {
      movies: [],
    }
  },
//   Fetch from api.js for first view movie cards on component mounted
  mounted() {
    api
      .fetchmovies("iron man")
      .then(res => {
        this.movies = res.Search;
      })
      .catch(error => {
        console.log(error);
      });

  },
  methods: {
  }
}
</script>