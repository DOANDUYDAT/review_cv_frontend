<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <filter-cv @filter-cv="onFilter"></filter-cv>
      </v-col>
      <v-col cols="9" v-if="listCv && listCv.length">
        <cv-list v-if="listCv" :list-cv-data="listCv"></cv-list>
        <div class="text-center">
          <v-pagination v-model="page" :length="lengthPage"></v-pagination>
        </div>
      </v-col>
      <v-col cols="9" v-else>
        <h3>Không có CV phù hợp</h3>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CvList from "./CvList";
import FilterCv from "./FilterCv";
import cvService from "../../api/cv";
import EventBus from "../../services/event-bus";

export default {
  components: {
    CvList,
    FilterCv
  },
  data() {
    return {
      listCv: null,
      page: 1,
      pageSize: 10,
      totalCv: 0
    };
  },
  computed: {
    lengthPage() {
      if (this.totalCv === 0) {
        return 1;
      } else {
        if (this.totalCv % this.pageSize === 0) {
          return Math.floor(this.totalCv / this.pageSize);
        } else {
          return Math.floor(this.totalCv / this.pageSize) + 1;
        }
      }
    }
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
      this.totalCv = await cvService.getTotalCv();
    }
  },
  created() {
    this.getData();
    EventBus.$on("search-cv", async textSearch => {
      this.listCv = await cvService.search(textSearch);
    });
  },
  destroyed() {
    EventBus.$off();
  }
};
</script>
