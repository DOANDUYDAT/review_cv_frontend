<template>
  <v-main>
    <v-container>
      Home Page
    </v-container>
  </v-main>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import { get } from "../api/user";

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
    fetchData() {
      this.user = get();
    }
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData();
  }
};
</script>
