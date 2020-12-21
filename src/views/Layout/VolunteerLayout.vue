<template>
  <v-app>
    <v-app-bar flat app color="white">
      <v-row align="center" no-gutters class="mx-16">
        <v-col cols="8" class="py-2">
          <v-avatar
            size="50"
            @click="GoToVolunteerHomePage"
            class="mr-10"
            color="#00bda0"
          >
            <v-img src="../../assets/logo.png"></v-img>
          </v-avatar>
        </v-col>
        <v-col cols="2">
          <v-btn text @click="GoToForumsPage" color="white">
            Diễn đàn
          </v-btn>
          <v-btn rounded text dark v-if="currentUser">
            Điểm uy tín: {{ currentUser.user.reputationPoint }}
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
            <v-list-item @click="GoToUpdateVolunteerProfilePage">
              <v-list-item-title>Cập nhật thông tin</v-list-item-title>
            </v-list-item>
            <v-list-item @click="GoToChangeStatusNotifyPage">
              <v-list-item-title>Cài đặt thông báo email</v-list-item-title>
            </v-list-item>
            <v-list-item @click="GoToReviewCvListPage">
              <v-list-item-title>Danh sách CV review</v-list-item-title>
            </v-list-item>
            <v-list-item @click="GoToConvertPointPage">
              <v-list-item-title>Đổi điểm tích lũy</v-list-item-title>
            </v-list-item>
            <v-list-item @click="GoToExchangeGiftPage">
              <v-list-item-title>Đổi quà</v-list-item-title>
            </v-list-item>
            <v-list-item @click="LogOut">
              <v-list-item-title>Đăng xuất</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-spacer></v-spacer>
        <notify-dialog></notify-dialog>
      </v-row>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import NotifyDialog from "./components/NotifyDialog";
import volunteerService from "../../api/volunteer";
import { updateInfoService, exchangePointService } from "../../api/volunteer";
import authService from "../../api/authentication";
export default {
  data: () => ({
    // user: {
    //   username: ""
    // },
    currentUser: null
  }),
  components: {
    NotifyDialog
  },
  methods: {
    GoToVolunteerHomePage() {
      const { role } = this.currentUser.user;
      let newPath = "";
      if (role === "member") {
        newPath = "/memberHome";
      } else if (role === "specialist") {
        newPath = "/specialistHome";
      } else if (role === "volunteer") {
        newPath = "/volunteerHome";
      } else {
        newPath = "/about";
      }
      const currentPath = this.$route.path;
      if (newPath !== currentPath) {
        this.$router.push({ path: newPath });
      }
    },
    GoToUpdateVolunteerProfilePage() {
      this.$router.push({ name: "Update Volunteer Profile" });
    },
    GoToChangeStatusNotifyPage() {
      this.$router.push({ name: "Update Volunteer Profile" });
    },
    GoToConvertPointPage() {
      this.$router.push({ name: "Convert Point" });
    },
    GoToExchangeGiftPage() {
      this.$router.push({ name: "Exchange Gift" });
    },
    GoToReviewCvListPage() {
      this.$router.push({ name: "Volunteer Review CV List" });
    },
    GoToForumsPage() {
      this.$router.push({ name: "Forums Home" });
    },
    async getData() {
      const userId = await authService.getCurrentUserId();
      const user = await volunteerService.getVolunteer(userId);
      this.currentUser = user;
      // this.user.username = user.username;
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
    exchangePointService.on("created", () => this.getData());
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
