<template>
  <v-sheet class="pa-8">
    <h1 class="font-weight-medium">Thống kê</h1>
    <v-row class="pa-4" justify="space-between">
      <v-sheet color="primary">
        <v-list-item style="height: 140px; width: 250px;">
          <v-list-item-avatar tile size="70">
            <v-icon style="font-size: 70px;" dark>mdi-account</v-icon>
          </v-list-item-avatar>
          <v-list-item-content class="text-end">
            <v-list-item-title class="title mb-2 white--text">
              Thành viên
            </v-list-item-title>
            <v-list-item-title class="headline mb-2 white--text">
              {{ totalMember }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-sheet>
      <v-sheet color="success">
        <v-list-item style="height: 140px; width: 250px;">
          <v-list-item-avatar tile size="70">
            <v-icon style="font-size: 70px;" dark>mdi-account-star</v-icon>
          </v-list-item-avatar>
          <v-list-item-content class="text-end">
            <v-list-item-title class="title mb-2 white--text">
              Chuyên gia
            </v-list-item-title>
            <v-list-item-title class="headline mb-2 white--text">
              {{ totalSpecialist }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-sheet>
      <v-sheet color="purple">
        <v-list-item style="height: 140px; width: 250px;">
          <v-list-item-avatar tile size="70">
            <v-icon style="font-size: 70px;" dark>mdi-account-multiple</v-icon>
          </v-list-item-avatar>
          <v-list-item-content class="text-end">
            <v-list-item-title class="title mb-2 white--text">
              Cộng tác viên
            </v-list-item-title>
            <v-list-item-title class="headline mb-2 white--text">
              {{ totalVolunteer }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-sheet>
      <v-sheet color="warning">
        <v-list-item style="height: 140px; width: 250px;">
          <v-list-item-avatar tile size="70">
            <v-icon style="font-size: 70px;" dark>mdi-file-account</v-icon>
          </v-list-item-avatar>
          <v-list-item-content class="text-end">
            <v-list-item-title class="title mb-2 white--text">
              Số lượng CV
            </v-list-item-title>
            <v-list-item-title class="headline mb-2 white--text">
              {{ totalCvUpload }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-sheet>
      <v-sheet color="error">
        <v-list-item style="height: 140px; width: 250px;">
          <v-list-item-avatar tile size="70">
            <v-icon style="font-size: 70px;" dark>mdi-gift</v-icon>
          </v-list-item-avatar>
          <v-list-item-content class="text-end">
            <v-list-item-title class="title mb-2 white--text">
              Quà tặng
            </v-list-item-title>
            <v-list-item-title class="headline mb-2 white--text">
              {{ totalGift }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-sheet>
    </v-row>
    <v-row class="py-4">
      <v-col cols="6">
        <cv-chart></cv-chart>
      </v-col>
      <v-col cols="6">
        <question-chart></question-chart>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
import CvChart from "./Components/CvChart";
import QuestionChart from "./Components/QuestionChart.vue";
import memberService from "@/api/member";
import volunteerService from "@/api/volunteer";
import specialistService from "@/api/specialist";
import giftService from "@/api/gift";
import cvService from "@/api/cv";

export default {
  components: {
    CvChart,
    QuestionChart
  },
  data() {
    return {
      totalSpecialist: 0,
      totalMember: 0,
      totalVolunteer: 0,
      totalCvUpload: 0,
      totalGift: 0
    };
  },
  methods: {
    async getData() {
      this.totalMember = await memberService.getTotalMember();
      this.totalSpecialist = await specialistService.getTotalSpecialist();
      this.totalVolunteer = await volunteerService.getTotalVolunteer();
      this.totalCvUpload = await cvService.getTotalCv();
      this.totalGift = await giftService.getTotalGift();
    }
  },
  created() {
    this.getData();
  }
};
</script>
