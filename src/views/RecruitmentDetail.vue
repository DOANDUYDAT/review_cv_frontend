<template>
  <v-sheet v-if="recruitment && specialist" style="min-height: 600px">
    <v-toolbar color="blue" dark flat>
      <v-card-title>
        <span class="headline">Thông tin tuyển dụng</span>
      </v-card-title>
    </v-toolbar>
    <v-card-text>
      <v-row>
        <v-col cols="3">
          <v-img src="../assets/company.jpg"></v-img>
        </v-col>
        <v-col cols="9" style="align-self: center;">
          <h2 class="primary--text text-uppercase">
            {{ recruitment.title }}
          </h2>
          <span class="title">{{ specialist.company }}</span>
          <h3>
            Website:
            <span class="body-1">{{ specialist.websiteCompany }}</span>
          </h3>
          <h3>
            Ngành nghề: <span class="body-1">{{ recruitment.field }}</span>
          </h3>
          <h3>
            Địa điểm làm việc:
            <span class="body-1">{{ recruitment.location }}</span>
          </h3>
          <h3>
            Hạn nộp hồ sơ:
            <v-icon class="px-2" color="success">mdi-clock-outline</v-icon>
            <span class="body-1 success--text">{{
              shortDate(recruitment.expiredDate)
            }}</span>
          </h3>
          <h3>
            Tên nguời nhận hồ sơ:
            <span class="body-1">{{ specialist.user.fullName }}</span>
          </h3>
          <h3>
            Email nhận hồ sơ:
            <span class="body-1">{{ specialist.user.email }}</span>
          </h3>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <p class="headline font-weight-medium">Mô tả công việc</p>
          <span v-html="recruitment.content"></span>
        </v-col>
      </v-row>
    </v-card-text>
  </v-sheet>
</template>
<script>
import recruitmentService from "@/api/recruitment.js";
import specialistService from "@/api/specialist.js";

export default {
  data() {
    return {
      recruitment: null,
      specialist: null
    };
  },
  methods: {
    shortDate: timeStamp => {
      let d = new Date(timeStamp);
      return d.toLocaleDateString();
    },
    async getData() {
      const recruitmentId = this.$route.params.recruitmentId;
      this.recruitment = await recruitmentService.getRecruitment(recruitmentId);
      this.specialist = await specialistService.getSpecialist(
        this.recruitment.userId
      );
    }
  },
  created() {
    this.getData();
  }
};
</script>
