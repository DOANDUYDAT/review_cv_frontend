<template>
  <v-row>
    <v-col cols="9">
      <v-sheet class="pa-4" v-if="listCv && listCv.length">
        <h2 class="font-weight-medium">Danh sách CV đã review</h2>
        <v-divider></v-divider>
        <div v-for="cv in listCv" :key="cv._id">
          <v-row>
            <v-col cols="2" class="text-center" align-self="center">
              <v-avatar color="grey darken-1" size="100">
                <v-img src="../../assets/avatar.jpg"></v-img>
              </v-avatar>
            </v-col>
            <v-col cols="10">
              <v-row>
                <v-col cols="9" class="py-0" @click.stop="goToReviewResult(cv)">
                  <h3>{{ cv.author.user.fullName }}</h3>
                  <div>
                    Lĩnh vực làm việc:
                    <span v-for="(fi, i) in cv.fields" :key="i">{{ fi }}</span>
                  </div>
                  <span>Cấp bậc: {{ cv.position }}</span
                  ><br />
                  <span>Địa điểm: {{ cv.location }}</span
                  ><br />
                  <span>Kinh nghiệm: </span>
                  <span class="green--text">{{ cv.exp }}</span>
                </v-col>
                <v-col cols="3" class="py-0 text-center"> </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-divider></v-divider>
        </div>
      </v-sheet>
      <v-sheet class="pa-4" v-else>
        <h2 class="font-weight-medium">Danh sách CV đã review</h2>
        <v-divider></v-divider>
        <div class="pt-4">Bạn chưa review CV xxxxnào</div>
      </v-sheet>
    </v-col>
    <v-col cols="3" class="pl-0">
      <v-sheet min-height="100vh"></v-sheet>
    </v-col>
  </v-row>
</template>
<script>
// import reviewService from "@/api/review";
// import cvService from "../../api/cv";
// import volunteerService from "../../api/volunteer";
import authService from "../../api/authentication";
export default {
  data() {
    return {
      file: null,
      listCv: null,
      currentUser: null
    };
  },
  methods: {
    goToReviewResult(cv) {
      this.$router.push({
        path: `/volunteertHome/view-review-result/${cv._id}`
      });
    },
    async getData() {
      debugger;
      const userId = await authService.getCurrentUserId();
      console.log(userId);
      // const volunteer = await volunteerService.getVolunteer(userId);
      // this.currentUser = volunteer;
      // this.listCv = await cvService.getListCvById(
      //   this.currentUser.listReviewedCv
      // );
    }
  },
  created() {
    this.getData();
  }
};
</script>
<style lang="scss" scoped></style>
