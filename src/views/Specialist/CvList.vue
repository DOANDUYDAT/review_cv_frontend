<template>
  <v-container v-if="listCv && listCv.length">
    <cv-item
      v-for="item in listCv"
      :key="item._id"
      :cv-data="item"
      :heart-status="heart(item)"
      :received-status="received(item)"
    >
    </cv-item>
  </v-container>
  <v-container v-else>
    Không có CV phù hợp
  </v-container>
</template>
<script>
import cvService from "../../api/cv";
import CvItem from "./CvItem";
import specialistService from "../../api/specialist";
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
    heart(cv) {
      const { listInterester } = cv;
      return this.currentUser
        ? listInterester.includes(this.currentUser.userId)
        : false;
    },
    received(cv) {
      return this.currentUser &&
        this.currentUser.listReceivedCv.find(e => e.cvId === cv._id)
        ? true
        : false;
    },
    async interestedCv(item) {
      cvService.interestedCv(item._id);
      if (!this.heart) {
        this.heart = !this.heart;
        try {
          this.$swal({
            toast: true,
            position: "top-end",
            title: "Quan tâm CV thành công!",
            icon: "success",
            showConfirmButton: false,
            timer: 1500
          });
        } catch (err) {
          this.$swal({
            toast: true,
            position: "top-end",
            title: "Quan tâm CV thất bại!",
            text: err,
            icon: "error",
            showConfirmButton: false,
            timer: 1500
          });
        }
      } else {
        this.heart = !this.heart;
        try {
          this.$swal({
            toast: true,
            position: "top-end",
            title: "Bỏ quan tâm CV thành công!",
            icon: "success",
            showConfirmButton: false,
            timer: 1500
          });
        } catch (err) {
          this.$swal({
            toast: true,
            position: "top-end",
            title: "Bỏ quan tâm CV thất bại!",
            text: err,
            icon: "error",
            showConfirmButton: false,
            timer: 1500
          });
        }
      }
      // this.heart = !this.heart;
    },
    async getData() {
      const userId = await authService.getCurrentUserId();
      const specialist = await specialistService.getSpecialist(userId);
      this.currentUser = specialist;
      this.listCv = this.listCvData;
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
