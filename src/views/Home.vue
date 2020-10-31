<template>
  <v-container>
    <v-card
      class="screen--full d-flex justify-center flex-column align-center mx-auto"
    >
      <v-btn
        class="mt-2"
        width="50%"
        depressed
        color="primary"
        @click="GoToLoginPage"
        >Đăng nhập</v-btn
      >
      <v-btn
        class="mt-2"
        width="50%"
        depressed
        color="warning"
        @click="GoToSignUpMemberPage"
        >Đăng ký làm thành viên</v-btn
      >
      <v-btn
        class="mt-2"
        width="50%"
        depressed
        color="success"
        @click="GoToSignUpSpecialistPage"
        >Đăng ký làm chuyên gia</v-btn
      >
      <v-btn
        class="mt-2"
        width="50%"
        depressed
        color="error"
        @click="GoToSignUpVolunteerPage"
        >Đăng ký làm cộng tác viên</v-btn
      >
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
  components: {
    // HelloWorld
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
</style>
