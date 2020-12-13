<template>
  <v-container>
    <v-row>
      <v-col cols="10">
        <span> Danh sách CV</span>
      </v-col>
      <v-col cols="2">
        <v-btn color="success" href="/CV/mau-cv" target="_blank">
          <v-icon>mdi-plus</v-icon>
          Tạo mới
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-for="item in listCV" :key="item.id">
      <InforCV :infor="item"></InforCV>
    </v-row>
  </v-container>
</template>

<script>
import InforCV from "./InforCV";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "QuanLy",
  data() {
    return {
      listCV: [
        {
          id: 1,
          source: "https://picsum.photos/id/11/500/300",
          title: "JOB",
          date: "25-12-2020",
          key: "https://i.topcv.vn/ledinhduc?ref=3460812"
        }
      ]
    };
  },
  computed: {
    ...mapGetters({
      dataList: "data",
      loading: "loading",
      error: "error"
    })
  },
  methods: {
    ...mapActions("Cv", {
      getCV: "getListCV"
    })
  },
  mounted() {
    this.getCV()
      .then(response => {
        console.log(response);
        this.listCV = response;
      })
      .catch(e => {
        console.log(e);
      });
  },
  components: {
    InforCV
  }
};
</script>
<style lang="scss"></style>
