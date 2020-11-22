<template>
  <div class="cv__study item__cv">
    <div class="cv__infor--content ">
      <div class="cv__study--title item__cv--title">
        <input type="text" :value="data.name" />
      </div>
      <v-divider></v-divider>
      <div v-for="item in data.content" :key="item.id">
        <div class="cv__study--content content__cv">
          <input type="text" :value="item.value" />
          <div class="option__content">
            <v-btn color="success">
              <v-icon>mdi-plus</v-icon>
              Them
            </v-btn>
            <v-btn color="error">
              <v-icon>mdi-minus</v-icon>
              Xoa
            </v-btn>
          </div>
        </div>
      </div>
    </div>
    <div class="option">
      <v-icon> mdi-menu</v-icon>
      <v-icon @click="incrementOrder(data.order)"> mdi-menu-down</v-icon>
      <v-icon @click="decrementOrder(data.order)"> mdi-menu-up </v-icon>
      <v-btn color="error">
        <v-icon>mdi-minus</v-icon>
        An muc
      </v-btn>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "Education",
  methods: {
    ...mapActions("Cv", ["incrementOrder", "decrementOrder"])
  },
  props: ["data"]
};
</script>
