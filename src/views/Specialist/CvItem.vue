<template>
  <div>
    <v-row v-if="cv" @click.stop="goToCv()">
      <v-col cols="2" class="text-center" align-self="center">
        <v-avatar color="grey darken-1" size="100">
          <v-img src="../../assets/avatar.jpg"></v-img>
        </v-avatar>
      </v-col>
      <v-col cols="10">
        <v-row>
          <v-col cols="9" class="pb-0">
            <h3>{{ cv.author.user.fullName }}</h3>
            <div>
              Lĩnh vực làm việc:
              <span v-for="(fi, i) in cv.fields" :key="i">{{ fi }}</span>
            </div>
            <span>Cấp bậc: {{ cv.position }}</span>
          </v-col>
          <v-col cols="3" class="text-right">
            <v-row>
              <v-col cols="12" class="py-0 text-right">
                <v-btn icon @click.stop="interestedCv(cv)">
                  <v-icon v-if="!heart">mdi-heart-outline</v-icon>
                  <v-icon color="red" v-else>mdi-heart</v-icon>
                </v-btn>
                <span class="body-2" :class="{ 'red--text': heart }"
                  >Quan tâm</span
                >
              </v-col>
              <v-col cols="12" class="py-0 text-right" v-if="receivedStatus">
                <v-icon small color="green">mdi-check-bold</v-icon>
                <span class="body-2 green--text">Đã nhận</span>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6" class="pt-0 text-left"
            >Kinh nghiệm:
            <span class="green--text">{{ cv.exp }}</span>
          </v-col>
          <v-col cols="6" class="pt-0 text-right"
            >Cập nhật ngày {{ shortDate(cv.createdAt) }}</v-col
          >
        </v-row>
      </v-col>
    </v-row>
    <v-divider></v-divider>
  </div>
</template>
<script>
import cvService from "../../api/cv";

export default {
  data() {
    return {
      cv: null,
      heart: null
    };
  },
  computed: {},
  props: {
    cvData: {
      type: Object,
      required: true,
      default: function() {
        return null;
      }
    },
    heartStatus: {
      type: Boolean,
      required: true,
      default: null
    },
    receivedStatus: {
      type: Boolean,
      required: true,
      default: null
    }
  },
  methods: {
    shortDate: timeStamp => {
      let d = new Date(timeStamp);
      return d.toLocaleDateString();
    },
    goToCv() {
      this.$router.push({
        path: `/specialistHome/view-cv/${this.cv._id}`
      });
    },
    async interestedCv(item) {
      cvService.interestedCv(item._id);
      if (!this.heart) {
        this.heart = !this.heart;
        try {
          this.$swal({
            toast: true,
            position: "top-end",
            title: "Quan tâm CV thành công!",
            icon: "success",
            showConfirmButton: false,
            timer: 1500
          });
        } catch (err) {
          this.$swal({
            toast: true,
            position: "top-end",
            title: "Quan tâm CV thất bại!",
            text: err,
            icon: "error",
            showConfirmButton: false,
            timer: 1500
          });
        }
      } else {
        this.heart = !this.heart;
        try {
          this.$swal({
            toast: true,
            position: "top-end",
            title: "Bỏ quan tâm CV thành công!",
            icon: "success",
            showConfirmButton: false,
            timer: 1500
          });
        } catch (err) {
          this.$swal({
            toast: true,
            position: "top-end",
            title: "Bỏ quan tâm CV thất bại!",
            text: err,
            icon: "error",
            showConfirmButton: false,
            timer: 1500
          });
        }
      }
      // this.heart = !this.heart;
    },
    async getData() {
      this.cv = this.cvData;
      this.heart = this.heartStatus;
    }
  },
  created() {
    this.getData();
  }
};
</script>
<style lang="scss" scoped></style>
