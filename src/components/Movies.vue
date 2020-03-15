<template>

<!-- Container and layout for movie cards -->
  <v-container grid-list-xl>
    <v-layout class="d-flex flex-wrap">

    </v-layout>
  </v-container>

</template>

<script>
import api from "../api";

export default {
  data () {
    return {
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