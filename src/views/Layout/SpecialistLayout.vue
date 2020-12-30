<template>
  <v-app>
    <v-app-bar flat app color="white">
      <v-row align="center" no-gutters class="mx-16" v-if="currentUser">
        <v-col cols="2" class="py-2">
          <v-avatar
            size="50"
            @click="GoToSpecialistHomePage"
            class="mr-10"
            color="#00bda0"
          >
            <v-img src="../../assets/logo.png"></v-img>
          </v-avatar>
        </v-col>
        <v-col cols="4">
          <v-responsive min-width="150">
            <v-text-field
              dense
              flat
              dark
              hide-details
              rounded
              solo-inverted
              append-icon="mdi-magnify"
              label="Search"
              @click:append="search"
              @keyup.enter="search"
              v-model="searchText"
            ></v-text-field>
          </v-responsive>
        </v-col>
        <v-col offset="2" cols="2">
          <v-btn text @click="GoToForumsPage" color="white">
            Diễn đàn
          </v-btn>
          <v-btn text rounded dark>
            Điểm uy tín: {{ currentUser.user.reputationPoint }}
          </v-btn>
        </v-col>
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn text dark v-on="on">
              <v-icon left>mdi-account-circle</v-icon>
              {{ currentUser.user.userName }}
              <v-icon right>mdi-menu-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="GoToUpdateSpecialistProfilePage">
              <v-list-item-title>Cập nhật thông tin</v-list-item-title>
            </v-list-item>
            <v-list-item @click="GoToChangeStatusNotifyPage">
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
import specialistService from "../../api/specialist";
import { updateInfoService } from "../../api/specialist";
import authService from "../../api/authentication";
import EventBus from "../../services/event-bus";

export default {
  data: () => ({
    currentUser: null,
    searchText: ""
  }),
  components: {
    NotifyDialog
  },
  methods: {
    search() {
      EventBus.$emit("search-cv", this.searchText);
    },
    GoToSpecialistHomePage() {
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
    GoToUpdateSpecialistProfilePage() {
      this.$router.push({ name: "Update Specialist Profile" });
    },
    GoToChangeStatusNotifyPage() {
      this.$router.push({ name: "Update Specialist Profile" });
    },
    GoToReceivedCvListPage() {
      this.$router.push({ name: "Received CV List" });
    },
    GoToReviewHistoryPage() {
      this.$router.push({ name: "Reviewed CV List" });
    },
    GoToForumsPage() {
      this.$router.push({ name: "Forums Home" });
    },
    async getData() {
      const userId = await authService.getCurrentUserId();
      const user = await specialistService.getSpecialist(userId);
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
