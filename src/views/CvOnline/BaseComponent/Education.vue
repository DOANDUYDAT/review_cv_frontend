<template>
  <div class="cv__study item__cv">
    <div class="cv__infor--content ">
      <div class="cv__study--title item__cv--title">
        <div
          contenteditable
          :style="{ fontSize: bigfont + 'px', fontFamily: fontfamily }"
          v-html="contentDetails.name"
        ></div>
      </div>
      <v-divider></v-divider>
      <div v-for="(item, i) in contentDetails.content" :key="i">
        <div class="cv__study--content content__cv">
          <!-- <div
            contenteditable
            :style="{
              fontSize: smallFont + 'px',
              marginTop: lineheight + 'px',
              fontFamily: fontfamily
            }"
            @input="editItem($event, i)"
            v-html="item.value"
          ></div> -->
          <base-editor
            :value.sync="item.value"
            :bigfont="bigfont"
            :smallFont="smallFont"
            :lineheight="lineheight"
            :fontfamily="fontfamily"
          ></base-editor>
          <div class="option__content">
            <v-btn color="success" small @click="addContent(i)">
              <v-icon>mdi-plus</v-icon>
              Thêm
            </v-btn>
            <v-btn color="error" small @click="deleteContent(i)">
              <v-icon>mdi-minus</v-icon>
              Xóa
            </v-btn>
          </div>
        </div>
      </div>
    </div>
    <div class="option">
      <v-icon @click="changeTab('AddCV')">mdi-menu</v-icon>
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
/* eslint-disable no-unused-vars */
import { mapActions, mapGetters, mapState } from "vuex";
import BaseEditor from "./BaseEditor";

export default {
  name: "Education",
  components: {
    BaseEditor
  },
  props: ["data", "bigfont", "smallFont", "lineheight", "fontfamily"],
  data() {
    return {
      contentDetails: {},
      defaultSize: "",
      currentTagName: "",
      idItem: ""
    };
  },
  computed: {
    ...mapGetters("Cv", {
      // command: "command",
      loading: "loading",
      error: "error"
    })
    // ...mapState("Editor", ["currentSelection"])
  },
  watch: {
    // currentTagName() {
    //   // console.log(this.command);
    //   this.getCurrentTagName();
    // },
    // command: function(newVal, oldVal) {
    //   // watch it
    //   console.log("Prop changed: ", newVal, " | was: ", oldVal);
    //   // console.log(this);
    //   this.exec(newVal);
    // }
    // contentDetails: {
    //   handler: function(val, oldVal) {
    //     this.updateCategoryData(val);
    //   },
    //   deep: true
    // }
  },
  methods: {
    ...mapActions("Cv", [
      "incrementOrder",
      "decrementOrder",
      "hiddenCategory",
      "updateCategoryData",
      "updateContentCv"
    ]),
    ...mapActions("Editor", [
      "changeTab",
      "changeOSelection",
      "changeSFormat",
      "changeSJusitfy",
      "changeEditting"
    ]),
    editItem(evt, i) {
      // this.contentDetails.content[i].value = evt.target.innerHTML;
      console.log(this.contentDetails.content[i].value);
    },
    updateSelectedElement(evt) {
      let oSelection = evt.target;
      this.changeOSelection(oSelection);
    },
    updateCommand() {
      // query command state
      let lFormatText = ["bold", "italic", "underline"];
      let lJustifyText = ["justifyLeft", "justifyCenter", "justifyRight"];
      let sFormat = [];
      let sJustify = null;
      // clear command
      this.changeSFormat(sFormat);
      this.changeSJusitfy(sJustify);
      lFormatText.forEach((e, i) => {
        if (document.queryCommandState(e)) {
          sFormat.push(i);
        }
      });
      lJustifyText.forEach((e, i) => {
        if (document.queryCommandState(e)) {
          sJustify = i;
        }
      });
      // console.log("asa");
      console.log(sFormat, sJustify);
      //update command
      this.changeSFormat(sFormat);
      this.changeSJusitfy(sJustify);
    },
    addContent(i) {
      document.getSelection().removeAllRanges();
      const elementArray = [...this.contentDetails.content];
      const newElement = { ...elementArray[i] };
      this.contentDetails.content.splice(i + 1, 0, newElement);
    },
    deleteContent(i) {
      const length = this.contentDetails
        ? this.contentDetails.content
          ? this.contentDetails.content.length
          : 0
        : 0;
      if (i <= length - 1 && length > 1) {
        this.contentDetails.content.splice(i, 1);
      }
    }
  },
  created() {
    this.contentDetails = JSON.parse(JSON.stringify(this.data));
  }
};
</script>

<style lang="scss" scoped>
.option__content .v-btn:first-child {
  margin-right: 10px;
}
</style>
