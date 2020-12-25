<template>
  <v-container class="pt-0" v-if="listReview">
    <v-row>
      <v-col cols="9">
        <v-sheet class="pa-4" min-height="100vh">
          <h2 class="font-weight-medium">Danh sách kết quả review CV</h2>
          <v-divider></v-divider>
          <div v-for="item in listReview" :key="item._id">
            <v-row>
              <v-row>
                <v-col cols="2" class="text-center" align-self="center">
                  <v-avatar color="grey darken-1" size="100">
                    <v-img src="../../assets/avatar.jpg"></v-img>
                  </v-avatar>
                </v-col>
                <v-col cols="10" @click="goToReviewResult(item)">
                  <h4>CV được review bởi</h4>
                  <h3 class="font-weight-medium">
                    <span v-if="isSpecialist(item.author)">Chuyên gia</span>
                    <span v-else>Cộng tác viên</span>
                  </h3>
                  <h3>{{ item.author.user.fullName }}</h3>
                  <v-row align="end" v-if="isSpecialist(item.author)">
                    <v-col cols="12" class="py-0 green--text">
                      Điểm uy tín: {{ item.author.user.reputationPoint }}</v-col
                    >
                    <v-col cols="3" class="py-0 pr-0">
                      <v-icon small>mdi-domain</v-icon>
                      {{ item.author.company }}
                    </v-col>

                    <v-col cols="3" class="py-0 pl-0">
                      <v-icon small>mdi-web</v-icon>
                      {{ item.author.websiteCompany }}
                    </v-col>
                    <v-col cols="6" class="py-0 pr-4 text-right">
                      Review ngày {{ shortDate(item.author.createdAt) }}
                    </v-col>
                  </v-row>
                  <v-row v-else>
                    <v-col cols="6" class="py-0 green--text">
                      Điểm uy tín: {{ item.author.user.reputationPoint }}</v-col
                    >
                    <v-col cols="6" class="py-0 pr-4 text-right">
                      Review ngày {{ shortDate(item.author.createdAt) }}
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-row>
            <v-divider></v-divider>
          </div>
        </v-sheet>
      </v-col>
      <v-col cols="3" class="pl-0">
        <v-sheet min-height="100vh"></v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import reviewService from "../../api/review";
import memberService from "../../api/member";
import authService from "../../api/authentication";
export default {
  data() {
    return {
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
      this.$router.push({ path: `/memberHome/review-result/${review._id}` });
    },
    async getData() {
      const userId = await authService.getCurrentUserId();
      const member = await memberService.getMember(userId);
      this.currentUser = member;
      this.listReview = await reviewService.getListReviewByListCvId(
        this.currentUser.listCv
      );
    },
    isSpecialist(author) {
      return author.user.role === "specialist";
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
