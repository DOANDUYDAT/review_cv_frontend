<template>
  <v-container class="d-flex flex-column justify-center screen--full bg" fluid>
    <v-card :width="widthCard" class="px-16 pa-10 mx-auto">
      <v-img
        class="mx-auto"
        width="50%"
        hight="50%"
        src="../assets/logo1.png"
      ></v-img>
      <v-row>
        <v-col cols="12" class="pb-0">
          <v-btn
            class="mt-2"
            width="100%"
            depressed
            color="primary"
            @click="GoToLoginPage"
            >Đăng nhập</v-btn
          >
        </v-col>
        <v-col cols="12" class="pb-0">
          <v-btn
            class="mt-2"
            width="100%"
            depressed
            color="warning"
            @click="GoToSignUpMemberPage"
            >Đăng ký làm thành viên</v-btn
          >
        </v-col>
        <v-col cols="12" class="pb-0">
          <v-btn
            class="mt-2"
            width="100%"
            depressed
            color="success"
            @click="GoToSignUpSpecialistPage"
            >Đăng ký làm chuyên gia</v-btn
          >
        </v-col>
        <v-col cols="12" class="pb-0">
          <v-btn
            class="mt-2"
            width="100%"
            depressed
            color="error"
            @click="GoToSignUpVolunteerPage"
            >Đăng ký làm cộng tác viên</v-btn
          >
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
// import { get } from "../api/user";

export default {
  name: "Home",
  data: () => ({
    user: null,
    loading: false,
    error: null
  }),
  computed: {
    widthCard() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "100%";
        case "sm":
          return "100%";
        case "md":
          return "60%";
        case "lg":
          return 500;
        case "xl":
          return 500;
        default:
          return "100%";
      }
    }
  },
  methods: {
    // fetchData() {
    //   this.user = get();
    // },
    GoToLoginPage() {
      this.$router.push({ name: "Login" });
    },
    GoToSignUpMemberPage() {
      this.$router.push({ name: "Sign Up Member" });
    },
    GoToSignUpSpecialistPage() {
      this.$router.push({ name: "Sign Up Specialist" });
    },
    GoToSignUpVolunteerPage() {
      this.$router.push({ name: "Sign Up Volunteer" });
    }
  }
};
</script>
<style lang="scss" scoped>
.screen--full {
  height: 100vh;
}
.bg {
  background-image: url("../assets/background.jpg");
  background-size: cover;
}
</style>
