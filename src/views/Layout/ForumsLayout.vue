<template>
  <v-app id="inspire">
    <v-app-bar app color="white" flat>
      <v-container class="py-0 fill-height" fluid>
        <!-- <v-container fluid> -->

        <!-- <v-btn v-for="link in links" :key="link" text>
          {{ link }}
        </v-btn> -->
        <v-btn @click="goToHomeForums" text>Forums</v-btn>

        <v-spacer></v-spacer>

        <v-responsive min-width="150" v-show="!$vuetify.breakpoint.mobile">
          <v-text-field
            dense
            flat
            hide-details
            rounded
            solo-inverted
          ></v-text-field>
        </v-responsive>
        <v-spacer></v-spacer>
        <v-btn text v-show="!$vuetify.breakpoint.mobile">
          <span>Đần Thúi</span>
          <v-icon right>mdi-account-circle</v-icon>
        </v-btn>
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container :fluid="$vuetify.breakpoint.mobile">
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    links: ["Dashboard", "Messages", "Profile", "Updates"]
  }),
  methods: {
    goToHomeForums() {
      this.$router.push({
        name: "Forums Home"
      });
    }
  }
};
</script>
