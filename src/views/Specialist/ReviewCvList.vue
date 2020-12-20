<template>
  <v-sheet class="pa-4" v-if="listCv">
    <h2 class="font-weight-medium">Danh sách CV đã nhận review</h2>
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
            <v-col cols="9" class="py-0">
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
            <v-col cols="3" class="py-0 text-center">
              <v-row>
                <v-col cols="12" class="py-0 text-center">
                  <h4>Upload kết quả review</h4>
                </v-col>
                <v-col class="py-0">
                  <form
                    action="http://localhost:3030/uploads"
                    method="post"
                    enctype="multipart/form-data"
                  >
                    <v-img
                      class="mx-auto mb-2"
                      src="../../assets/cv1.png"
                      hight="35%"
                      width="35%"
                      style="position: relative;"
                    >
                      <v-file-input
                        hide-input
                        accept="application/pdf"
                        prepend-icon="mdi-card-outline"
                        style="position: absolute; top: 7px; left: 26px; z-index: 10"
                        v-model="file"
                      >
                      </v-file-input>
                    </v-img>
                    <v-btn color="#0da1ec" small outlined @click="upLoadReview">
                      Submit
                    </v-btn>
                  </form>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-divider></v-divider>
    </div>
  </v-sheet>
</template>
<script>
import reviewService from "@/api/review";
import cvService from "../../api/cv";
import volunteerService from "../../api/volunteer";
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
    async upLoadReview() {
      const res = await reviewService.uploadReview(this.file);
      console.log(res);
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
<style lang="scss" scoped></style>
