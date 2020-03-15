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
            <!-- Dialog for movie ratings -->
          <v-dialog v-model="dialog" width="500">
          <!-- Button for ratings -->
        <template v-slot:activator="{ on }">
          <v-btn slot="activator" large color="green" v-on="on" dark>View Ratings</v-btn>
        </template>
        <v-card>
            <!-- Card for ratings -->
              <v-card-title class="headline grey lighten-2">Ratings</v-card-title>
              <v-card-text>
                <table>
                  <thead></thead>
                  <tbody>
                    <tr v-for="(rating, index) in this.ratings" :key="index">
                      <td align="center">{{ ratings[index].Source }}</td>
                      <td align="center">
                          <!-- Ratings -->
                        <v-rating
                          :half-increments="true"
                          :value="ratings[index].Value"
                          :empty-icon="emptyIcon"
                          :full-icon="fullIcon"
                          :half-icon="halfIcon"
                          :color="color"
                          :background-color="bgColor"
                          :readonly="readonly"
                        ></v-rating>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <!-- Close ratings dialog button -->
                <v-btn outlined color="green" x-large text @click="dialog = false">EXIT</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
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
      loading: true,
      dialog: false,
      ratings: "",
      emptyIcon: "mdi-heart-outline",
      fullIcon: "mdi-heart",
      halfIcon: "mdi-heart-half-full",
      color: "red lighten-3",
      readonly: true,
      bgColor: "grey lighten-1"
    };
  },
  //   Fetch from api.js for movie selected on component mounted
  mounted() {
    api
      .fetchmovie(this.id)
      .then(res => {
        this.movie = res;
        this.ratings = this.movie.Ratings;
        // Map for get ratings in float from sources sent by api
        // (Internet Movie Database, Rotten Tomatoes, Metacritic)
        this.ratings.map(function(rat) {
          rat.Value = parseFloat(rat.Value.split(/\/|%/)[0]);
          rat.Value = rat.Value <= 10 ? rat.Value / 2 : rat.Value / 20;
        });
        this.loading
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
