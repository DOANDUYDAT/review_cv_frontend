<template>
  <div class="about">
    <h1>This is an about page</h1>
    <v-btn @click="LogOut">Log Out</v-btn>
  </div>
</template>
<script>
/* eslint-disable no-unused-vars */
import authService from "../api/authentication";
import messageService from "../api/message";
import { notificationServiceRoot } from "../api/notification";
import { messageServiceRoot } from "../api/message";
export default {
  name: "About",
  methods: {
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
    notificationServiceRoot.on("created", data => console.log(data));
    messageServiceRoot.on("created", data => console.log(data));
  }
};
</script>
