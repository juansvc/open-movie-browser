<template>
  <!-- containter to present while handling data -->
  <v-container v-if="loading">
    <div class="text-xs-center">
      <v-progress-linear indeterminate color="green"></v-progress-linear>
    </div>
  </v-container>
  <!-- container when data ready -->
  <v-container v-else>
    <v-layout wrap>
      <v-flex xs12 mr-1 ml-1>
        <!-- Movie cards -->
        <v-card>
          <v-img :src="movie.Poster" aspect-ratio="2.5"></v-img>
          <!-- Movie data -->
          <v-card-title primary-title>
            <div>
              <h2 class="display-2">{{ movie.Title }}-{{ movie.Year }}</h2>
              <p class="subtitle-1">{{ movie.Plot }}</p>
              <h3>Actors:</h3>
              <p class="body-1">{{ movie.Actors }}</p>
              <h3>Awards:</h3>
              <p class="body-1">{{ movie.Awards }}</p>
              <p class="body-1">Genre: {{ movie.Genre }}</p>
            </div>
          </v-card-title>
          <v-card-actions>
            <!-- Back button -->
            <v-btn outlined color="green" large @click="back">Back</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex mt-n12 mx-auto>
        <div class="text-center">
          <!-- Button for ratings -->
          <v-btn large color="green" dark>View Ratings</v-btn>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import api from "../api";
export default {
  // id sent by click on view buttom from movie cards
  props: ["id"],

  data() {
    return {
      movie: "",
      loading: true
    };
  },
  //   Fetch from api.js for movie selected on component mounted
  mounted() {
    api
      .fetchmovie(this.id)
      .then(res => {
        this.movie = res;
        this.loading = false;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    //   Back home button
    back() {
      this.$router.push("/");
    }
  }
};
</script>
