<template>
  <v-sheet class="pa-4">
    <v-row v-if="cv" @click="goToCv()">
      <v-col cols="2" class="text-center" align-self="center">
        <v-avatar color="grey darken-1" size="100">
          <v-img src="../../assets/avatar.jpg"></v-img>
        </v-avatar>
      </v-col>
      <v-col cols="10">
        <v-row>
          <v-col cols="9">
            <h3>{{ cv.author.user.fullName }}</h3>
            <div>
              Lĩnh vực làm việc:
              <span v-for="(fi, i) in cv.fields" :key="i">{{ fi }}</span>
            </div>
            <br />
            <span>Cấp bậc: {{ cv.position }}</span>
            <v-row>
              <v-col cols="6" class="py-0 text-left"
                >Kinh nghiệm:
                <span class="green--text">{{ cv.exp }}</span>
              </v-col>
              <v-col cols="6" class="py-0 text-right"
                >Cập nhật 6 ngày trước</v-col
              >
            </v-row>
          </v-col>
          <v-col cols="3" class="text-right"></v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-divider></v-divider>
  </v-sheet>
</template>
<script>
// import cvService from "../../api/cv";

export default {
  data() {
    return {
      cv: null
    };
  },
  props: {
    cvData: {
      type: Object,
      required: true,
      default: function() {
        return null;
      }
    }
  },
  methods: {
    goToCv() {
      this.$router.push({
        path: `/volunteerHome/view-cv/${this.cv._id}`
      });
    },
    async getData() {
      this.cv = this.cvData;
    }
  },
  created() {
    this.getData();
  }
};
</script>
<style lang="scss" scoped>
// @import "@/variables.scss";
// .container {
//   background-color: white;
// }
</style>
