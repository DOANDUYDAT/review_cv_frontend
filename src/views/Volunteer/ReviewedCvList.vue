<template>
  <v-row>
    <v-col cols="9">
      <v-sheet class="pa-4" v-if="listReview && listReview.length">
        <h2 class="font-weight-medium">Danh sách CV đã review</h2>
        <v-divider></v-divider>
        <div v-for="review in listReview" :key="review._id">
          <v-row>
            <v-col cols="2" class="text-center" align-self="center">
              <v-avatar color="grey darken-1" size="100">
                <v-img src="../../assets/avatar.jpg"></v-img>
              </v-avatar>
            </v-col>
            <v-col cols="10">
              <v-row>
                <v-col
                  cols="9"
                  class="py-0"
                  @click.stop="goToReviewResult(review)"
                >
                  <h3>{{ review.cv.author.user.fullName }}</h3>
                  <div>
                    Lĩnh vực làm việc:
                    <span v-for="(fi, i) in review.cv.fields" :key="i">{{
                      fi
                    }}</span>
                  </div>
                  <span>Cấp bậc: {{ review.cv.position }}</span
                  ><br />
                  <span>Địa điểm: {{ review.cv.location }}</span>
                </v-col>
                <!-- <v-col cols="3" class="text-end" style="align-self: flex-end">
                  <v-icon small color="green"
                    >mdi-checkbox-marked-circle</v-icon
                  >
                  <span class="body-2 green--text">Đã public</span>
                </v-col> -->
              </v-row>
              <v-row>
                <v-col cols="6" class="py-0 text-left"
                  >Kinh nghiệm:
                  <span class="green--text">{{ review.cv.exp }}</span>
                </v-col>
                <v-col cols="6" class="py-0 text-right">
                  Review ngày {{ shortDate(review.cv.createdAt) }}
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-divider></v-divider>
        </div>
      </v-sheet>
      <v-sheet class="pa-4" v-else>
        <h2 class="font-weight-medium">Danh sách CV đã review</h2>
        <v-divider></v-divider>
        <div class="pt-4">Bạn chưa review CV nào</div>
      </v-sheet>
    </v-col>
    <v-col cols="3" class="pl-0">
      <v-sheet min-height="100vh"></v-sheet>
    </v-col>
  </v-row>
</template>
<script>
import reviewService from "@/api/review";
// import cvService from "../../api/cv";
import volunteerService from "../../api/volunteer";
import authService from "../../api/authentication";
export default {
  data() {
    return {
      file: null,
      listReview: null,
      currentUser: null
    };
  },
  methods: {
    shortDate: timeStamp => {
      let d = new Date(timeStamp);
      return d.toLocaleDateString();
    },
    goToReviewResult(review) {
      this.$router.push({
        path: `/volunteerHome/view-review-result/${review._id}`
      });
    },
    async getData() {
      const userId = await authService.getCurrentUserId();
      const volunteer = await volunteerService.getVolunteer(userId);
      this.currentUser = volunteer;
      this.listReview = await reviewService.getListReviewByListReviewId(
        this.currentUser.listReview
      );
    }
  },
  created() {
    this.getData();
  }
};
</script>
<style lang="scss" scoped></style>
