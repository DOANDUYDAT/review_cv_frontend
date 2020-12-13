<template>
  <div class="cv__goal item__cv" contenteditable="true">
    <div class="cv__infor--content ">
      <div class="cv__goal--title item__cv--title">
        <p
          contenteditable="true"
          :style="{ fontSize: bigfont + 'px', fontFamily: fontfamily }"
        >
          {{ contentDetails.name }}
        </p>
      </div>
      <v-divider></v-divider>
      <div v-for="(item, id) in contentDetails.content" :key="id">
        <div class="cv__goal--content content__cv">
          <p
            contenteditable="true"
            :style="{
              fontSize: smallFont + 'px',
              marginTop: lineheight + 'px',
              fontFamily: fontfamily
            }"
          >
            {{ item.value }}
          </p>
          <div class="option__content">
            <v-btn color="success" small @click="addContent(id)">
              <v-icon>mdi-plus</v-icon>
              Thêm
            </v-btn>
            <v-btn color="error" small @click="deleteContent(id)">
              <v-icon>mdi-minus</v-icon>
              Xóa
            </v-btn>
          </div>
        </div>
      </div>
    </div>
    <div class="option">
      <v-icon @click="$emit('finished')"> mdi-menu</v-icon>
      <v-icon @click="incrementOrder(contentDetails.order)">
        mdi-menu-down</v-icon
      >
      <v-icon @click="decrementOrder(contentDetails.order)">
        mdi-menu-up
      </v-icon>
      <v-btn color="error" small @click="hiddenCategory(contentDetails.order)">
        <v-icon>mdi-minus</v-icon>
        Ẩn mục
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "GoalJob",
  data() {
    return {
      contentDetails: {},
      defaultSize: "",
      currentTagName: "",
      idItem: ""
    };
  },
  // watch: {
  //   currentTagName() {
  //     debugger;
  //     console.log(this.command);
  //     this.getCurrentTagName();
  //   },
  //   command: function(newVal, oldVal) {
  //     // watch it
  //     console.log("Prop changed: ", newVal, " | was: ", oldVal);
  //     this.exec(this.command);
  //   }
  // },
  methods: {
    // exec(command, arg) {
    //   document.execCommand(command, false, arg);
    // },
    // getCurrentTagName() {
    //   if (window.getSelection().baseNode) {
    //     this.currentTagName = window.getSelection().baseNode.parentNode.tagName;
    //     console.log(this.currentTagName);
    //   }
    // },
    addContent(id) {
      // const idItem = parseInt(id);
      const elementArray = [...this.contentDetails.content];
      const element = {
        id: id,
        ...elementArray[id]
      };
      this.contentDetails.content.splice(id + 1, 0, element);
    },
    deleteContent(id) {
      // const elementArray = [...this.contentDetails.content];
      // const element = {
      //   id: id,
      //   ...elementArray[id]
      // };
      const length = this.contentDetails
        ? this.contentDetails.content
          ? this.contentDetails.content.length
          : 0
        : 0;
      if (id <= length - 1 && length != 1) {
        this.contentDetails.content.splice(id, 1);
      }
    },
    ...mapActions("Cv", ["incrementOrder", "decrementOrder", "hiddenCategory"])
  },
  props: ["data", "bigfont", "smallFont", "lineheight", "fontfamily"],
  created() {
    this.contentDetails = JSON.parse(JSON.stringify(this.data));
    console.log(this.content);
    // console.log(this.bigFont);
  }
};
</script>

<style lang="scss">
.option__content .v-btn:first-child {
  margin-right: 10px;
}
</style>
