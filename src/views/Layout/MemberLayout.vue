<template>
  <v-app>
    <v-app-bar flat app color="white">
      <v-row align="center" no-gutters class="mx-16">
        <v-col cols="7" class="py-2">
          <v-avatar
            size="50"
            @click="GoToMemberHomePage"
            class="mr-10"
            color="#00bda0"
          >
            <v-img src="../../assets/logo.png"></v-img>
          </v-avatar>
        </v-col>
        <v-col cols="3">
          <v-btn text @click="GoToForumsPage" color="white">
            Diễn đàn
          </v-btn>
          <v-btn text @click="GoToQuanLyCVPage" color="white">
            Quản lý CV
          </v-btn>
          <v-btn text rounded dark>
            Điểm uy tín: 50
          </v-btn>
        </v-col>
        <v-menu offset-y v-if="currentUser">
          <template v-slot:activator="{ on }">
            <v-btn text dark v-on="on">
              <v-icon left>mdi-account-circle</v-icon>
              {{ currentUser.user.userName }}
              <v-icon right>mdi-menu-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="GoToUpdateProfilePage">
              <v-list-item-title>Cập nhật thông tin</v-list-item-title>
            </v-list-item>
            <v-list-item @click="GoToChangeStatusNotifyPage">
              <v-list-item-title>Cài đặt thông báo email</v-list-item-title>
            </v-list-item>
            <v-list-item @click="LogOut">
              <v-list-item-title>Đăng xuất</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-spacer></v-spacer>
        <v-btn icon exact>
          <v-icon color="white">mdi-bell</v-icon>
        </v-btn>
      </v-row>
    </v-app-bar>

    <v-main>
      <!-- <v-container> -->
      <router-view></router-view>
      <!-- </v-container> -->
    </v-main>
  </v-app>
</template>
<script>
import memberService from "../../api/member";
import { updateInfoService } from "../../api/member";
import authService from "../../api/authentication";
export default {
  data: () => ({
    currentUser: null
  }),
  methods: {
    GoToMemberHomePage() {
      this.$router.push({ name: "Upload CV" });
    },
    GoToUpdateProfilePage() {
      this.$router.push({ name: "Update Profile" });
    },
    GoToChangeStatusNotifyPage() {
      this.$router.push({ name: "Update Profile" });
    },
    GoToForumsPage() {
      this.$router.push({ name: "Forums Home" });
    },
    GoToQuanLyCVPage() {
      this.$router.push({ name: "Quan Ly" });
    },
    async getData() {
      const userId = await authService.getCurrentUserId();
      const user = await memberService.getMember(userId);
      this.currentUser = user;
    },
    LogOut() {
      authService.logout().finally(() => {
        this.$router.push({ name: "Home" });
        this.$swal({
          position: "center",
          icon: "success",
          title: "You are logged out!",
          showConfirmButton: false,
          timer: 1500
        });
      });
    }
  },
  created() {
    this.getData();
  },
  mounted() {
    updateInfoService.on("created", () => this.getData());
  }
};
</script>
<style lang="scss" scoped>
.v-app-bar {
  background-image: linear-gradient(0.25turn, #00bda0 30%, #007ddd);
}
.v-main {
  background-color: #eeeeee;
}
</style>
