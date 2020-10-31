<template>
  <div class="about">
    <h1>This is an about page</h1>
    <v-btn @click="LogOut">Log Out</v-btn>
  </div>
</template>
<script>
import authService from "../api/authentication";
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
  }
};
</script>
