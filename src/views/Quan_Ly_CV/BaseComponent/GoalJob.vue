<template>
  <div class="cv__goal item__cv">
    <div class="cv__infor--content ">
      <div class="cv__goal--title item__cv--title">
        <input type="text" value="MỤC TIÊU NGHỀ NGHIỆP" />
      </div>
      <v-divider></v-divider>
      <div class="cv__goal--content content__cv">
        <input type="text" value="HELLO WORLD" />
        <div class="option__content">
          <v-btn color="success" small>
            <v-icon>mdi-plus</v-icon>
            Them
          </v-btn>
          <v-btn color="error" small>
            <v-icon>mdi-minus</v-icon>
            Xoa
          </v-btn>
        </div>
      </div>
    </div>
    <div class="option">
      <v-icon> mdi-menu</v-icon>
      <v-icon> mdi-menu-down</v-icon>
      <v-icon> mdi-menu-up </v-icon>
      <v-btn color="error" small>
        <v-icon>mdi-minus</v-icon>
        An muc
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoalJob",
  data() {
    return {};
  },
  methods: {}
};
</script>
