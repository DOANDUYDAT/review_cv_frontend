<template>
  <v-sheet class="pa-4" v-if="cv">
    <v-row>
      <v-col cols="9">
        <iframe
          :src="linkex"
          width="100%"
          height="800px"
          frameborder="0"
        ></iframe>
      </v-col>
      <v-col cols="3">
        <v-row>
          <v-col cols="3" class="text-center" align-self="center">
            <v-avatar color="grey darken-1" size="50">
              <v-img src="../../assets/avatar.jpg"></v-img>
            </v-avatar>
          </v-col>
          <v-col cols="9" align-self="center">
            <h3>{{ cv.author.user.fullName }}</h3>
            <!-- <span>Thực tập sinh</span> -->
          </v-col>
        </v-row>
        <v-row align="start">
          <v-col cols="1" class="py-0">
            <v-icon small>mdi-briefcase-variant</v-icon>
          </v-col>
          <v-col cols="5" class="body-2 py-0">
            {{ cv.exp }}
          </v-col>
          <v-col cols="1" class="py-0">
            <v-icon small>mdi-sort-descending</v-icon>
          </v-col>
          <v-col cols="5" class="body-2 py-0">
            {{ cv.position }}
          </v-col>
          <v-col cols="1" class="py-0">
            <v-icon small>mdi-briefcase-account</v-icon>
          </v-col>
          <v-col cols="5" class="body-2 py-0">
            <span v-for="(fi, i) in cv.fields" :key="i">{{ fi }}</span>
          </v-col>
          <v-col cols="1" class="py-0">
            <v-icon small>mdi-map-marker</v-icon>
          </v-col>
          <v-col cols="5" class="flex-end py-0 body-2">
            {{ cv.location }}
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="12" class="text-center pb-0 text-uppercase">
            <h3>Bạn có muốn</h3>
          </v-col>
          <v-col cols="12" class="text-center py-0">
            <h4>Những phần thưởng hấp dẫn?</h4>
          </v-col>

          <v-col cols="1">
            <v-icon small>mdi-information</v-icon>
          </v-col>
          <v-col cols="11" class="pl-4">
            Bạn hãy review CV này để có thể nhận những phần thưởng hấp dẫn
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6" class="text-center">
            <v-btn
              :disabled="status"
              @click="reviewCv"
              depressed
              outlined
              color="red"
            >
              Review CV
            </v-btn>
          </v-col>
          <v-col cols="6" class="text-center">
            <v-btn
              @click="downloadCv"
              depressed
              outlined
              color="blue"
              :disabled="!status"
            >
              Tải xuống
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-sheet>
</template>
<script>
import cvService from "../../api/cv";
import volunteerService from "../../api/volunteer";
import authService from "../../api/authentication";

export default {
  data() {
    return {
      status: false,
      cv: null,
      currentUser: null,
      file: null,
      linkex: null
    };
  },
  methods: {
    async reviewCv() {
      const result = await this.$swal({
        title: "Bạn có muốn review CV này?",
        html:
          "<hr><br/>Để review CV, bạn hãy download CV và thực hiện review, upload kết quả lên hệ thống trong vòng 24h.<br/>" +
          "(Bạn có thể bị trừ điểm uy tín<br/>nếu vượt quá thời gian quy định)",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy"
      });
      if (result.isConfirmed) {
        await cvService.reviewCv(this.cv._id);
        this.status = !this.status;
        try {
          await this.$swal({
            title: "Thành công",
            text: "Hãy review CV để xem thông tin liên hệ của ứng viên",
            icon: "success"
          });
        } catch (err) {
          await this.$swal({
            title: "Thất bại",
            text: err,
            icon: "error"
          });
        }
      }
    },
    downloadCv() {
      console.log("download CV");
    },
    async getData() {
      const cvId = this.$route.params.cvId;
      this.cv = await cvService.getCvById(cvId);
      const userId = await authService.getCurrentUserId();
      const volunteer = await volunteerService.getVolunteer(userId);
      this.currentUser = volunteer;
      let listReceivedCvId = volunteer.listReceivedCv.map(e => e.cvId);
      this.status = listReceivedCvId.includes(cvId);
      let myUrl = "http://localhost:3030/cv/" + this.cv.linkHidden;
      this.file = await (await fetch(myUrl)).blob();
      this.linkex = URL.createObjectURL(this.file).toString() + "#toolbar=0";
    }
  },
  created() {
    this.getData();
  }
};
</script>
<style lang="scss" scoped></style>
