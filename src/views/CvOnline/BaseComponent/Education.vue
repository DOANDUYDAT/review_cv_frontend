<template>
  <div class="cv__study item__cv">
    <div class="cv__infor--content ">
      <div class="cv__study--title item__cv--title">
        <input
          type="text"
          @mouseup="getCurrentTagName"
          contenteditable="true"
          v-model.lazy="command"
          :style="{ fontSize: bigfont + 'px', fontFamily: fontfamily }"
          id="titleEduCate"
        />
        <div
          @mouseup="getCurrentTagName"
          contenteditable="true"
          @blur="goodJob"
          :style="{ fontSize: bigfont + 'px', fontFamily: fontfamily }"
          v-html="contentDetails.name"
        ></div>
      </div>
      <v-divider></v-divider>
      <div v-for="(item, i) in contentDetails.content" :key="i">
        <div class="cv__study--content content__cv">
          <div
            @mouseup="getCurrentTagName"
            contenteditable="true"
            :style="{
              fontSize: smallFont + 'px',
              marginTop: lineheight + 'px',
              fontFamily: fontfamily
            }"
            @blur="editItem($event, i)"
            v-html="item.value"
          ></div>
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
/* eslint-disable no-unused-vars */
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Education",
  data() {
    return {
      contentDetails: {},
      defaultSize: "",
      currentTagName: "",
      idItem: ""
    };
  },
  watch: {
    currentTagName() {
      console.log(this.command);
      this.getCurrentTagName();
    },
    command: function(newVal, oldVal) {
      // watch it
      console.log("Prop changed: ", newVal, " | was: ", oldVal);
      // console.log(this);
      this.exec(newVal);
    },
    contentDetails: {
      handler: function(val, oldVal) {
        this.updateCategoryData(val);
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters("Cv", {
      command: "command",
      loading: "loading",
      error: "error"
    })
  },
  methods: {
    editItem(e, i) {
      const item = e.srcElement;
      this.contentDetails.content[i].value = item.innerHTML;
    },
    goodJob() {
      debugger;
      const title = this.$refs.titleEduca.innerHTML;
      this.contentDetails.name = title;
    },
    exec(command, arg) {
      debugger;
      console.log(this.command);
      document.execCommand(command, false, arg);
    },
    getCurrentTagName() {
      if (window.getSelection().baseNode) {
        this.currentTagName = window.getSelection().baseNode.parentNode.tagName;
        console.log(this.currentTagName);
      }
    },
    addContent(i) {
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
    },
    ...mapActions("Cv", [
      "incrementOrder",
      "decrementOrder",
      "hiddenCategory",
      "updateCategoryData"
    ])
  },
  props: ["data", "bigfont", "smallFont", "lineheight", "fontfamily"],
  created() {
    this.contentDetails = JSON.parse(JSON.stringify(this.data));
    // console.log(this.content);
    // console.log(this.bigFont);
  }
};
</script>

<style lang="scss" scoped>
.option__content .v-btn:first-child {
  margin-right: 10px;
}
</style>
