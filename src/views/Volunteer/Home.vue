<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <filter-cv @filter-cv="onFilter"></filter-cv>
      </v-col>
      <v-col cols="9">
        <cv-list v-if="listCv" :list-cv-data="listCv"></cv-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CvList from "./CvList";
import FilterCv from "./FilterCv";
import cvService from "../../api/cv";
export default {
  components: {
    CvList,
    FilterCv
  },
  data() {
    return {
      listCv: null
    };
  },
  methods: {
    async onFilter(filter) {
      if (
        filter.fields.length === 0 &&
        filter.exp.length === 0 &&
        filter.position.length === 0 &&
        filter.timeType.length === 0
      ) {
        this.listCv = await cvService.getAllCvs();
      } else {
        this.listCv = await cvService.getListCvByFilter(filter);
      }
    },
    async getData() {
      this.listCv = await cvService.getAllCvs();
    }
  },
  created() {
    this.getData();
  }
};
</script>
