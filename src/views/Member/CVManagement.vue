<template>
  <v-container>
    <v-card>
      <v-card-title class="pt-6">
        <h2 class="teal--text">
          Quản lý CV của bạn
        </h2>
      </v-card-title>
      <v-tabs color="teal accent-4" left>
        <v-tab>Danh sách CV upload</v-tab>
        <v-tab>Danh sách CV online</v-tab>
        <v-tab-item>
          <v-container fluid v-if="listUploadCv && listUploadCv.length">
            <v-card v-for="cv in listUploadCv" :key="cv._id">
              <v-row class="px-6 py-3">
                <v-col cols="2">
                  <v-img
                    src="../../assets/cv2.jpg"
                    height="125"
                    class="grey darken-4"
                  ></v-img>
                </v-col>
                <v-col cols="10" class="pb-0">
                  <v-row>
                    <v-col cols="9">
                      <h2 class="teal--text font-weight-medium">
                        CV {{ cv.field }}
                      </h2>
                    </v-col>
                    <v-col cols="3" class="text-right">
                      {{ shortDateTime(cv.createdAt) }}
                    </v-col>
                    <v-col cols="12">
                      <v-input hide-details="auto">
                        <span class="ma-2">{{ cv.link }}</span>
                      </v-input>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="pb-0 text-right" cols="12">
                      <v-btn
                        small
                        color="#f6f6f6"
                        class="mx-2 grey--text"
                        depressed
                        @click="openDetailCv(cv)"
                      >
                        <v-icon left> mdi-eye-outline </v-icon>Xem CV</v-btn
                      >

                      <v-btn
                        small
                        color="#f6f6f6"
                        class="mx-2 grey--text"
                        depressed
                        @click.stop="goToReviewResultList(cv)"
                      >
                        <v-icon left> mdi-file-eye </v-icon>
                        {{ cv.listReview.length }} kết quả review</v-btn
                      >
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>
          </v-container>
          <v-container fluid v-else>
            <h3>Bạn chưa tải lên CV nào</h3>
          </v-container>
        </v-tab-item>

        <v-tab-item>
          <v-container fluid v-if="listOnlineCv && listOnlineCv.length">
            <v-row>
              <v-col cols="12" class="text-right">
                <v-btn color="teal" dark @click="goToWriteCvPage">
                  <v-icon left> mdi-plus-circle </v-icon>Tạo mới</v-btn
                >
              </v-col>
            </v-row>

            <v-card @click="goToReviewResultList">
              <v-row class="px-6 py-3">
                <v-col cols="2">
                  <v-img
                    src="https://picsum.photos/350/165?random"
                    height="125"
                    class="grey darken-4"
                  ></v-img>
                </v-col>
                <v-col cols="10" class="pb-0">
                  <v-row>
                    <v-col cols="9">
                      <h2 class="teal--text font-weight-medium">
                        CV lập trình VueJS
                      </h2>
                    </v-col>
                    <v-col cols="3" class="text-right">
                      12/22/2020, 5:07:38 PM
                      <!-- {{ shortDateTime(item.createdAt) }} -->
                    </v-col>
                    <v-col cols="12">
                      <v-input hide-details="auto">
                        <span class="ma-2"
                          >https://i.topcv.vn/duongthithoa?ref=3389360</span
                        >
                      </v-input>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="pb-0 text-right" cols="12">
                      <v-btn
                        small
                        color="#f6f6f6"
                        class="mx-2 grey--text"
                        depressed
                      >
                        <v-icon left> mdi-eye-outline </v-icon>Xem</v-btn
                      >

                      <v-btn
                        small
                        color="#f6f6f6"
                        class="mx-2 grey--text"
                        depressed
                      >
                        <v-icon left> mdi-download </v-icon>Tải xuống</v-btn
                      >

                      <v-btn
                        small
                        color="#f6f6f6"
                        class="mx-2 grey--text"
                        depressed
                      >
                        <v-icon left> mdi-lead-pencil </v-icon>Chỉnh sửa</v-btn
                      >

                      <v-btn
                        small
                        color="#f6f6f6"
                        class="ml-2 grey--text"
                        depressed
                      >
                        <v-icon left> mdi-trash-can </v-icon>Xóa</v-btn
                      >
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>
          </v-container>
          <v-container fluid v-else>
            <h3>Bạn chưa tạo CV online nào.</h3>
          </v-container>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </v-container>
</template>
<script>
import cvService from "@/api/cv";
import memberService from "../../api/member";
import authService from "../../api/authentication";

export default {
  data() {
    return {
      listUploadCv: null,
      listOnlineCv: null,
      currentUser: null
    };
  },
  methods: {
    shortDateTime: timeStamp => {
      let d = new Date(timeStamp);
      return d.toLocaleString();
    },
    goToReviewResultList(cv) {
      console.log(cv._id);
      this.$router.push({
        name: "Review Result List",
        params: { cvId: cv._id }
      });
    },
    goToWriteCvPage() {
      console.log("viet cv page");
      // this.$router.push({ path: "/viet-cv" });
    },
    async getLinkCv(cv) {
      let file = await (
        await fetch(`http://localhost:3030/cv/${cv.link}`)
      ).blob();
      return URL.createObjectURL(file).toString();
    },
    openDetailCv(cv) {
      window.open(cv.link);
    },
    async getData() {
      const userId = await authService.getCurrentUserId();
      const member = await memberService.getMember(userId);
      this.currentUser = member;
      this.listOnlineCv = await cvService.getListOnlineCv(member.userId);
      this.listUploadCv = await cvService.getListUploadCv(member.userId);
      for (let i = 0; i < this.listUploadCv.length; i++) {
        let cv = this.listUploadCv[i];
        this.getLinkCv(cv).then(link => {
          cv.link = link;
        });
      }
    }
  },
  created() {
    this.getData();
  }
};
</script>
<style lang="scss" scoped>
.v-input {
  border: 1px dashed rgba(0, 0, 0, 0.4);
}
</style>
