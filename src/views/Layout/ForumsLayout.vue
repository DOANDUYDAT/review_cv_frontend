<template>
  <v-app id="inspire">
    <v-app-bar app color="white" flat>
      <v-row align="center" no-gutters class="mx-16" v-if="currentUser">
        <v-col cols="2" class="py-2">
          <v-avatar
            size="50"
            @click="GoToMemberHomePage"
            class="mr-10"
            color="#00bda0"
          >
            <v-img src="../../assets/logo.png"></v-img>
          </v-avatar>
        </v-col>
        <v-col cols="5">
          <v-responsive min-width="150">
            <v-text-field
              dense
              flat
              dark
              hide-details
              rounded
              solo-inverted
              prepend-inner-icon="mdi-magnify"
              label="Search"
            ></v-text-field>
          </v-responsive>
        </v-col>
        <v-col offset="1" cols="4">
          <v-row>
            <v-btn @click="goToHomeForums" text color="white">Diễn đàn</v-btn>
            <v-btn text rounded dark>
              Điểm uy tín: {{ currentUser.user.reputationPoint }}
            </v-btn>
            <v-menu offset-y v-if="currentUser">
              <template v-slot:activator="{ on }">
                <v-btn text dark v-on="on">
                  <v-icon left>mdi-account-circle</v-icon>
                  {{ currentUser.user.userName }}
                  <v-icon right>mdi-menu-down</v-icon>
                </v-btn>
              </template>
              <v-list v-if="currentUser.user.role === 'member'">
                <v-list-item @click="GoToUpdateProfilePage">
                  <v-list-item-title>Cập nhật thông tin</v-list-item-title>
                </v-list-item>
                <v-list-item @click="GoToChangeStatusNotifyPage">
                  <v-list-item-title>Cài đặt thông báo email</v-list-item-title>
                </v-list-item>
                <v-list-item @click="GoToRecentReviewResultListPage">
                  <v-list-item-title
                    >Danh sách kết quả review gần đây</v-list-item-title
                  >
                </v-list-item>
                <v-list-item @click="LogOut">
                  <v-list-item-title>Đăng xuất</v-list-item-title>
                </v-list-item>
              </v-list>
              <v-list v-else-if="currentUser.user.role === 'specialist'">
                <v-list-item @click="GoToUpdateSpecialistProfilePage">
                  <v-list-item-title>Cập nhật thông tin</v-list-item-title>
                </v-list-item>
                <v-list-item @click="GoToSpecialistChangeStatusNotifyPage">
                  <v-list-item-title>Cài đặt thông báo email</v-list-item-title>
                </v-list-item>
                <v-list-item @click="GoToReceivedCvListPage">
                  <v-list-item-title>Danh sách CV đã nhận</v-list-item-title>
                </v-list-item>
                <v-list-item @click="GoToReviewHistoryPage">
                  <v-list-item-title>Lịch sử review</v-list-item-title>
                </v-list-item>
                <v-list-item @click="LogOut">
                  <v-list-item-title>Đăng xuất</v-list-item-title>
                </v-list-item>
              </v-list>
              <v-list v-else-if="currentUser.user.role === 'volunteer'">
                <v-list-item @click="GoToUpdateVolunteerProfilePage">
                  <v-list-item-title>Cập nhật thông tin</v-list-item-title>
                </v-list-item>
                <v-list-item @click="GoToVolunteerChangeStatusNotifyPage">
                  <v-list-item-title>Cài đặt thông báo email</v-list-item-title>
                </v-list-item>
                <v-list-item @click="GoToVolunteerReceivedCvListPage">
                  <v-list-item-title>Danh sách CV đã nhận</v-list-item-title>
                </v-list-item>
                <v-list-item @click="GoToVolunteerReviewHistoryPage">
                  <v-list-item-title>Lịch sử review</v-list-item-title>
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
              <v-list v-else-if="currentUser.user.role === 'admin'">
                <v-list-item @click="GoToUpAdminPage">
                  <v-list-item-title>Trang quản trị</v-list-item-title>
                </v-list-item>
                <v-list-item @click="LogOut">
                  <v-list-item-title>Đăng xuất</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-row>
        </v-col>
      </v-row>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container class="mt-4">
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import authService from "../../api/authentication";
export default {
  data: () => ({
    currentUser: null
  }),
  methods: {
    GoToMemberHomePage() {
      const { role } = this.currentUser.user;
      if (role === "member") {
        this.$router.push({ path: "/memberHome" });
      } else if (role === "specialist") {
        this.$router.push({ path: "/specialistHome" });
      } else if (role === "volunteer") {
        this.$router.push({ path: "/volunteerHome" });
      } else {
        this.$router.push({ path: "/about" });
      }
    },
    goToHomeForums() {
      this.$router.push({
        name: "Forums Home"
      });
    },
    GoToUpdateProfilePage() {
      this.$router.push({ name: "Update Profile" });
    },
    GoToChangeStatusNotifyPage() {
      this.$router.push({ name: "Update Profile" });
    },
    GoToRecentReviewResultListPage() {
      this.$router.push({ name: "Recent Review Result List" });
    },
    GoToUpdateSpecialistProfilePage() {
      this.$router.push({ name: "Update Specialist Profile" });
    },
    GoToSpecialistChangeStatusNotifyPage() {
      this.$router.push({ name: "Update Specialist Profile" });
    },
    GoToReceivedCvListPage() {
      this.$router.push({ name: "Received CV List" });
    },
    GoToReviewHistoryPage() {
      this.$router.push({ name: "Reviewed CV List" });
    },
    GoToUpdateVolunteerProfilePage() {
      this.$router.push({ name: "Update Volunteer Profile" });
    },
    GoToVolunteerChangeStatusNotifyPage() {
      this.$router.push({ name: "Update Volunteer Profile" });
    },
    GoToConvertPointPage() {
      this.$router.push({ name: "Convert Point" });
    },
    GoToExchangeGiftPage() {
      this.$router.push({ name: "Exchange Gift" });
    },
    GoToVolunteerReceivedCvListPage() {
      this.$router.push({ name: "Volunteer Received CV List" });
    },
    GoToVolunteerReviewHistoryPage() {
      this.$router.push({ name: "Volunteer Reviewed CV List" });
    },
    GoToUpAdminPage() {
      this.$router.push({ name: "Admin-chart" });
    },
    async getData() {
      const user = await authService.getUserByRole();
      this.currentUser = user;
    },
    LogOut() {
      authService.logout().finally(() => {
        this.$router.push({ name: "Home" });
        this.$swal({
          position: "center",
          icon: "success",
          title: "Đăng xuất thành công!",
          showConfirmButton: false,
          timer: 1500
        });
      });
    }
  },
  created() {
    this.getData();
  }
};
</script>
<style lang="scss" scoped>
.v-app-bar {
  background-image: linear-gradient(0.25turn, #00bda0 30%, #007ddd);
}
.container {
  background-color: white;
}
</style>
<style lang="scss">
.qa-editor .editor__content .ProseMirror {
  height: 200px;
  overflow: auto;
  outline: none;
}
.qa-editor .editor__content .ProseMirror:focus {
  outline: 2px solid #2196f3;
}
</style>
