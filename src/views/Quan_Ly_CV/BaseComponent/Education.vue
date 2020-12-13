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
          ref="titleEduca"
          @blur="goodJob"
          :style="{ fontSize: bigfont + 'px', fontFamily: fontfamily }"
          v-html="contentDetails.name"
        >
        </div>
      </div>
      <v-divider></v-divider>
      <div v-for="(item, id) in contentDetails.content" :key="id">
        <div class="cv__study--content content__cv">
          <p
            @mouseup="getCurrentTagName"
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
      debugger;
      console.log(this.command);
      this.getCurrentTagName();
    },
    command: function(newVal, oldVal) {
      // watch it
      console.log("Prop changed: ", newVal, " | was: ", oldVal);
      // console.log(this);
      this.exec(newVal);
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
    goodJob() {
      debugger;
      const title = this.$refs.titleEduca.textContent;
      console.log(this.$refs.titleEduca.textContent);
      // this.$refs.titleEduca;
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
