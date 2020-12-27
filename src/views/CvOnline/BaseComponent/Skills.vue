<template>
  <div class="cv__skills item__cv">
    <div class="cv__infor--content ">
      <div class="cv__skills--title item__cv--title">
        <input type="text" :value="skillDetails.name" />
      </div>
      <v-divider></v-divider>
      <div v-for="(item, id) in skillDetails.content" :key="id">
        <div class="cv__skills--content content__cv">
          <v-container>
            <v-row>
              <v-col cols="4">
                <p
                  class="cv__skills--key"
                  contenteditable="true"
                  :style="{
                    fontSize: smallFont + 'px',
                    marginTop: lineheight + 'px',
                    fontFamily: fontfamily
                  }"
                >
                  {{ item.name }}
                </p>
              </v-col>
              <v-col cols="8">
                <p
                  class="cv__skills--value"
                  contenteditable="true"
                  :style="{
                    fontSize: smallFont + 'px',
                    marginTop: lineheight + 'px',
                    fontFamily: fontfamily
                  }"
                >
                  {{ item.value }}
                </p>
              </v-col>
            </v-row>
            <!-- <div class="option__content">
              <v-btn color="success" @click="addItem($event)" small>
                <v-icon>mdi-plus</v-icon>
                Them
              </v-btn>
              <v-btn color="error" @click="deleteContent($event)" small>
                <v-icon>mdi-minus</v-icon>
                Xoa
              </v-btn>
            </div> -->
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
          </v-container>
        </div>
      </div>
    </div>
    <div class="option">
      <v-icon @click="$emit('finished')"> mdi-menu</v-icon>
      <v-icon @click="incrementOrder(skillDetails.order)">
        mdi-menu-down</v-icon
      >
      <v-icon @click="decrementOrder(skillDetails.order)">
        mdi-menu-up
      </v-icon>
      <v-btn color="error" small @click="hiddenCategory(skillDetails.order)">
        <v-icon>mdi-minus</v-icon>
        Ẩn mục
      </v-btn>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "Skills",
  data() {
    return {
      skillDetails: {},
      defaultSize: ""
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
      debugger;
      const elementArray = [...this.skillDetails.content];
      const element = {
        id: id,
        ...elementArray[id]
      };
      this.skillDetails.content.splice(id + 1, 0, element);
    },
    deleteContent(id) {
      // const elementArray = [...this.contentDetails.content];
      // const element = {
      //   id: id,
      //   ...elementArray[id]
      // };
      const length = this.skillDetails
        ? this.skillDetails.content
          ? this.skillDetails.content.length
          : 0
        : 0;
      if (id <= length - 1 && length != 1) {
        this.skillDetails.content.splice(id, 1);
      }
    },
    ...mapActions("Cv", ["incrementOrder", "decrementOrder", "hiddenCategory"])
  },
  props: ["data", "bigfont", "smallFont", "lineheight", "fontfamily"],
  created() {
    this.skillDetails = JSON.parse(JSON.stringify(this.data));
    console.log(this.skillDetails);
    // console.log(this.bigFont);
  }
};
</script>

<style lang="scss" scoped>
.option__content .v-btn:first-child {
  margin-right: 10px;
}
.container {
  padding: 0;
}
</style>
