<template>
  <v-container class="pt-0" v-if="listReview">
    <v-row>
      <v-col cols="9">
        <v-sheet class="pa-4" min-height="100vh">
          <h2 class="font-weight-medium">Danh sách kết quả review CV</h2>
          <v-divider></v-divider>
          <div v-for="item in listReview" :key="item._id">
            <v-row>
              <v-col cols="6">
                <v-row @click="goToReviewResult(item)">
                  <v-col
                    cols="3"
                    class="pr-0 py-0 text-center"
                    align-self="center"
                  >
                    <v-avatar color="grey darken-1" size="70">
                      <v-img src="../../assets/avatar.jpg"></v-img>
                    </v-avatar>
                  </v-col>
                  <v-col cols="9" class="pl-0 py-0">
                    <h5>CV được review bởi</h5>
                    <h4>
                      <span v-if="isSpecialist(item.author)">Chuyên gia</span>
                      <span v-else>Cộng tác viên</span>
                      {{ item.author.user.userName }}
                    </h4>
                    <v-row align="end" v-if="isSpecialist(item.author)">
                      <v-col cols="1" class="py-0">
                        <v-icon small>mdi-domain</v-icon>
                      </v-col>
                      <v-col cols="11" class="py-0">
                        {{ item.author.company }}
                      </v-col>
                      <v-col cols="1" class="py-0">
                        <v-icon small>mdi-web</v-icon>
                      </v-col>
                      <v-col cols="11" class="py-0">
                        {{ item.author.websiteCompany }}
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-col>
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
