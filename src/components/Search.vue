<template>
  <v-container>
    <v-container fluid>
          <v-row>
            <v-col v-for="item in items" :key="item.Title" cols="12" sm="1" md="3" lg="4">
              <!-- Movie cards -->
              <v-card>
                <v-img :src="item.Poster" aspect-ratio="1.5"></v-img>
                <!-- Movie title -->
                <v-card-title class="subheading font-weight-bold">
                  {{
                  item.Title
                  }}
                </v-card-title>
                <v-card-text>
                    <div class="body-2">Year: {{item.Year}}</div>
                    <div class="body-2">Type: {{item.Type}}</div>
                    <div class="body-2">IMDB-id: {{item.imdbID}}</div>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions class="justify-center">
                  <v-btn text outlined color="green" x-large @click="movie(item.imdbID)">View</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
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
      items: []
    };
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
