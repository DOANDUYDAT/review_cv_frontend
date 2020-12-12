<template>
  <v-app id="inspire">
    <v-app-bar app color="white" flat>
      <v-row align="center" no-gutters class="mx-16">
        <v-col cols="2" class="py-2">
          <!-- <v-container class="py-0 fill-height" fluid> -->
          <!-- <v-container fluid> -->

          <!-- <v-btn v-for="link in links" :key="link" text>
          {{ link }}
        </v-btn> -->
          <v-avatar
            size="50"
            @click="GoToMemberHomePage"
            class="mr-10"
            color="#00bda0"
          >
            <v-img src="../../assets/logo.png"></v-img>
          </v-avatar>
        </v-col>
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
        <v-spacer></v-spacer>
        <v-btn @click="goToHomeForums" text color="white">Forums</v-btn>
        <!-- <v-btn text v-show="!$vuetify.breakpoint.mobile">
          <span>Đần Thúi</span>
          <v-icon right>mdi-account-circle</v-icon>
        </v-btn> -->
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn text dark v-on="on">
              <v-icon left>mdi-account-circle</v-icon>
              {{ currentUser.user.userName }}
              <!-- Đần Thúi -->
              <v-icon right>mdi-menu-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="LogOut">
              <v-list-item-title>Đăng xuất</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <!-- </v-container> -->
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
// import memberService from "../../api/member";
import authService from "../../api/authentication";
export default {
  data: () => ({
    currentUser: null
  }),
  methods: {
    GoToMemberHomePage() {
      this.$router.push({ name: "Upload CV" });
    },
    goToHomeForums() {
      this.$router.push({
        name: "Forums Home"
      });
    },
    async getData() {
      const userId = await authService.getCurrentUserId();
      const role = await authService.getRole();
      const user = await authService.getUserByRole(role, userId);
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
