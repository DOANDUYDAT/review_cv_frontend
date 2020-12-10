<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <filter-cv></filter-cv>
      </v-col>
      <v-col cols="9">
        <cv-list></cv-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CvList from "./CvList";
import FilterCv from "./FilterCv";

export default {
  components: {
    CvList,
    FilterCv
  }
};
</script>
