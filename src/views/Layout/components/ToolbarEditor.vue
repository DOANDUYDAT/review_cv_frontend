<template>
  <v-container class="py-0" :class="{ 'toolbar-sticky': isSticky }">
    <v-row>
      <v-col
        cols="8"
        class="py-0 elevation-4"
        style="background-color: white; border-bottom: 1px solid gray;"
      >
        <v-row>
          <!-- <v-tabs-slider></v-tabs-slider> -->
          <v-col class="text-center pb-0">
            <div class="text-capitalize body-2">Tông màu</div>
            <v-btn text color="primary" @click="changeTab('ContentCV')">
              <v-icon>mdi-check</v-icon>
            </v-btn>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col class="text-center pb-0">
            <div class="text-capitalize body-2">Font chữ</div>
            <v-select
              :items="fonts"
              :value="fontFamily"
              @change="changeFontFamily"
              style="width: 100px"
              hide-details
              dense
            ></v-select>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col class="text-center pb-0">
            <div class="text-capitalize body-2">Cỡ chữ</div>
            <v-btn-toggle>
              <v-btn @click="fontDecrease" text small
                ><v-icon style="font-size: 1.3em"
                  >mdi-format-text-variant</v-icon
                ></v-btn
              >
              <v-btn @click="fontDefault" text small
                ><v-icon style="font-size: 1.55em"
                  >mdi-format-text-variant</v-icon
                ></v-btn
              >
              <v-btn @click="fontIncrease" text small
                ><v-icon style="font-size: 1.8em"
                  >mdi-format-text-variant</v-icon
                ></v-btn
              >
            </v-btn-toggle>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col class="text-center pb-0">
            <div class="text-capitalize body-2">Cách dòng</div>
            <v-btn-toggle>
              <v-btn text small @click="heightDecrease">
                <v-icon style="font-size: 1em">mdi-arrow-up-down</v-icon>
              </v-btn>
              <v-btn text small @click="heightDefault">
                <v-icon style="font-size: 1.2em">mdi-arrow-up-down</v-icon>
              </v-btn>
              <v-btn text small @click="heightIncrease">
                <v-icon style="font-size: 1.4em">mdi-arrow-up-down</v-icon>
              </v-btn>
            </v-btn-toggle>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col class="text-center pb-0">
            <div class="text-capitalize body-2">Thêm mục</div>
            <v-btn text color="primary" @click="changeTab('AddCV')">
              <v-icon>mdi-plus-circle</v-icon>
            </v-btn>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col class="text-center pb-0">
            <div class="text-capitalize body-2">Lưu CV</div>
            <v-btn text color="success" @click="saveCV">
              <v-icon>mdi-server</v-icon>
            </v-btn>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col class="text-right pb-0">
            <v-btn-toggle multiple :value="sFormat" @change="changeSFormat">
              <v-btn
                text
                small
                v-for="(item, index) in formatItems"
                :key="index"
                @click.prevent="formatDoc(item.command)"
                :title="item.title"
              >
                <v-icon>{{ item.icon }}</v-icon>
              </v-btn>
            </v-btn-toggle>
          </v-col>
          <v-col class="text-left pb-0">
            <v-btn-toggle :value="sJustify" @change="changeSJusitfy">
              <v-btn
                text
                small
                v-for="(item, index) in alignItems"
                :key="index"
                @click.prevent="formatDoc(item.command)"
                :title="item.title"
              >
                <v-icon>{{ item.icon }}</v-icon>
              </v-btn>
            </v-btn-toggle>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
// import AddCV from "./Add_CV";
// import ContentCV from "./CV_content";
// import MauCV from "./MauCV";
import memberService from "@/api/member";
import authService from "@/api/authentication";
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      fonts: ["Calibri", "Arial"],
      subComponents: ["ContentCV", "AddCV", "MauCV"],
      save: false,
      saveMessage: "",
      jobCount: 0,
      keyCV: "https://i.topcv.vn/ledinhduc?ref=3525428",
      Cv: {},
      formatItems: [
        {
          name: "Bold",
          title: "Bold",
          command: "bold",
          icon: "mdi-format-bold"
        },
        {
          name: "Italic",
          title: "Italic",
          command: "italic",
          icon: "mdi-format-italic"
        },
        {
          name: "Underline",
          title: "Underline",
          command: "underline",
          icon: "mdi-format-underline"
        }
      ],
      alignItems: [
        {
          name: "AlignLeft",
          title: "Align Left",
          command: "justifyLeft",
          icon: "mdi-format-align-left"
        },
        {
          name: "AlignCenter",
          title: "Align Center",
          command: "justifyCenter",
          icon: "mdi-format-align-center"
        },
        {
          name: "AlignRight",
          title: "Align Right",
          command: "justifyRight",
          icon: "mdi-format-align-right"
        }
      ],
      currentTagName: "",
      command: ""
    };
  },
  props: {
    isSticky: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  computed: {
    ...mapState("Editor", [
      "bigFont",
      "smallFont",
      "lineHeight",
      "fontFamily",
      "currentTab",
      "sFormat",
      "sJustify",
      "oSelection"
    ])
  },
  methods: {
    ...mapActions("Cv", ["initState", "createCommand"]),
    ...mapActions("Editor", [
      "fontIncrease",
      "fontDecrease",
      "fontDefault",
      "heightDecrease",
      "heightDefault",
      "heightIncrease",
      "changeFontFamily",
      "changeTab",
      "changeSFormat",
      "changeSJusitfy"
    ]),
    onSelectChange(fontFamily) {
      this.changeFontFamily(fontFamily);
    },
    formatDoc(sCmd, sValue) {
      console.log("edit");
      document.execCommand(sCmd, false, sValue);
      // if (this.oSelection) this.oSelection.focus();
    },
    borderRight(index) {
      var clubs = [5, 9, 13, 15, 18, 20, 22, 24, 26];

      return !!clubs.includes(index + 1);
    },

    // getCurrentTagName() {
    //   console.log(window.getSelection().baseNode);
    //   if (window.getSelection().baseNode) {
    //     this.currentTagName = window.getSelection().baseNode.parentNode.tagName;
    //     console.log(this.currentTagName);
    //   }
    // },
    currentTabComponent(index) {
      this.currentTab = this.subComponents[index];
    },
    finished: function(id) {
      // console.log(id);
      this.currentTab = this.subComponents[id];
    },
    saveCV: function() {
      this.save = !this.save;
      console.log(document.getElementsByTagName("div[contenteditable]"));
    },
    async getData() {
      const userId = await authService.getCurrentUserId();
      const member = await memberService.getMember(userId);
      this.currentUser = member;
    }
  },
  created() {
    // set state
    // this.initState(CV1);
    // this.getData();
  }
};
</script>
<style lang="scss" scoped>
.v-tab {
  text-transform: none !important;
}
.toolbar-sticky {
  position: sticky;
  top: 0;
  z-index: 999;
}
</style>
