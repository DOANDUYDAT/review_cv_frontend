<template>
  <v-sheet class="pa-4" v-if="listCv">
    <v-row>
      <v-col cols="6" @click="goToCv(cv)" v-for="cv in listCv" :key="cv._id">
        <v-row>
          <v-col cols="3" class="pr-0 text-center" align-self="center">
            <v-avatar color="grey darken-1" size="100">
              <v-img src="../../assets/avatar.jpg"></v-img>
            </v-avatar>
          </v-col>
          <v-col cols="9" class="pl-0">
            <h3>{{ cv.author.user.fullName }}</h3>
            <div>
              Lĩnh vực làm việc:
              <span v-for="(fi, i) in cv.fields" :key="i">{{ fi }}</span>
            </div>
            <span>Cấp bậc: {{ cv.position }}</span>
            <v-row>
              <v-col cols="6" class="py-0 text-left"
                >Kinh nghiệm:
                <span class="green--text">{{ cv.exp }}</span>
              </v-col>
              <v-col cols="6" class="py-0 text-right"
                >Cập nhật ngày {{ shortDate(cv.createdAt) }}</v-col
              >
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-divider></v-divider>
  </v-sheet>
</template>
<script>
import cvService from "../../api/cv";
import volunteerService from "../../api/volunteer";
import authService from "../../api/authentication";

export default {
  data() {
    return {
      listCv: null,
      currentUser: null
    };
  },
  methods: {
    shortDate: timeStamp => {
      let d = new Date(timeStamp);
      return d.toLocaleDateString();
    },
    goToCv(cv) {
      this.$router.push({
        path: `/volunteerHome/view-cv/${cv._id}`
      });
    },
    async getData() {
      const userId = await authService.getCurrentUserId();
      const volunteer = await volunteerService.getVolunteer(userId);
      this.currentUser = volunteer;
      this.listCv = await cvService.getAllCvs();
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
