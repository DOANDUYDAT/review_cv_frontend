<template>
  <v-container v-if="listCv && listCv.length">
    <cv-item
      v-for="item in listCv"
      :key="item._id"
      :cv-data="item"
      :received-status="received(item)"
    >
    </cv-item>
  </v-container>
  <v-container v-else>
    Không có Cv phù hợp
  </v-container>
</template>
<script>
// import cvService from "../../api/cv";
import CvItem from "./CvItem";
import volunteerService from "../../api/volunteer";
import authService from "../../api/authentication";

export default {
  data() {
    return {
      listCv: null,
      currentUser: null
    };
  },
  components: {
    CvItem
  },
  props: {
    listCvData: {
      type: Array,
      required: true,
      default: function() {
        return null;
      }
    }
  },
  watch: {
    listCvData: "getData"
  },
  computed: {},
  methods: {
    received(cv) {
      const { listInterester } = cv;
      return this.currentUser
        ? listInterester.includes(this.currentUser.userId)
        : false;
    },
    async getData() {
      const userId = await authService.getCurrentUserId();
      const volunteer = await volunteerService.getVolunteer(userId);
      this.currentUser = volunteer;
      // this.listCv = await cvService.getAllCvs();
      this.listCv = this.listCvData;
      // this.listReceivedCv = await cvService.getListCvById(
      //   this.currentUser.listReceivedCv
      // );
    }
  },
  created() {
    this.getData();
  }
};
</script>
<style lang="scss" scoped>
// @import "@/variables.scss";
.container {
  background-color: white;
}
</style>
