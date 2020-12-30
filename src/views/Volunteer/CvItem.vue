<template>
  <div>
    <v-row v-if="cv" @click="goToCv()">
      <v-col cols="2" class="text-center" align-self="center">
        <v-avatar color="grey darken-1" size="100">
          <v-img src="../../assets/avatar.jpg"></v-img>
        </v-avatar>
      </v-col>
      <v-col cols="10">
        <v-row>
          <v-col cols="9" class="pb-0">
            <h3>{{ cv.author.user.fullName }}</h3>
            <span>Lĩnh vực làm việc: {{ cv.field }}</span>
            <br />
            <span>Cấp bậc: {{ cv.position }}</span>
          </v-col>
          <v-col cols="3" class="text-right" v-if="receivedStatus">
            <v-icon small color="green">mdi-check-bold</v-icon>
            <span class="body-2 green--text">Đã nhận</span>
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
export default {
  data() {
    return {
      cv: null,
      currentUser: null
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
        path: `/volunteerHome/view-cv/${this.cv._id}`
      });
    },
    async getData() {
      this.cv = this.cvData;
    }
  },
  created() {
    this.getData();
  }
};
</script>
<style lang="scss" scoped></style>
