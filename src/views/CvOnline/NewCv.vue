<template>
  <v-container>
    <keep-alive>
      <component
        v-bind:is="currentTab"
        @finished="finished"
        :bigfont="bigFont"
        :smallfont="smallFont"
        :lineHeight="lineHeight"
        :fontFamily="fontFamily"
      ></component>
    </keep-alive>
  </v-container>
</template>
<script>
/* eslint-disable no-unused-vars */
import AddCV from "./Add_CV";
import ContentCV from "./CV_content";
import MauCV from "./MauCV";
import { mapActions, mapState } from "vuex";

const CV1 = {
  cvId: "1",
  userId: "12a",
  name: "CV thực tập",
  link: "",
  createAt: "22/10/2020",
  updatedAt: "22/11/2020",
  content: [
    {
      order: 3,
      name: "Mục Tiêu",
      isShow: true,
      type: "GoalJob",
      content: [
        {
          name: "Côngty 1",
          value: "- Học hỏi kinh nghiệm thực tế tại doanh nghiệp",
          id: "1"
        },
        {
          name: "Côngty 2",
          value: "- Trau dồi kỹ năng chuyên môn và kỹ năng mềm, tiếng anh",
          id: "2"
        }
      ]
    },
    {
      order: 1,
      type: "Education",
      isShow: true,
      name: "Học vấn",
      content: [
        {
          name: "Bằng 1",
          value: "Đã hoàn thành chương trình năm 4 đại học",
          id: "1"
        }
      ]
    },
    {
      order: 2,
      type: "Hobbies",
      isShow: true,
      name: "Sở thích",
      content: ["Đọc sách", "Xem phim"]
    },
    {
      order: 4,
      name: "Kĩ năng",
      isShow: true,
      type: "Skills",
      content: [
        {
          name: "Tin học văn phòng",
          value: "- Sử dụng thành thạo các công cụ Word, Excel, Power Point",
          id: "1"
        },
        {
          name: "Lập trình web",
          value:
            "Database: thiết kế và xây dựng cơ sở dữ liệu với MySQL, MongoDB",
          id: "2"
        }
      ]
    }
  ]
};

export default {
  name: "NewCV",
  components: {
    AddCV,
    ContentCV,
    MauCV
  },
  data() {
    return {
      fonts: ["Calibri", "Arial"],
      subComponents: ["ContentCV", "AddCV", "MauCV"],
      save: false,
      saveMessage: "",
      jobCount: 0,
      keyCV: "https://i.topcv.vn/ledinhduc?ref=3525428",
      Cv: {},
      commands: [
        { name: "Bold", title: "Bold", command: "bold", icon: "fa-bold" },

        {
          name: "Italic",
          title: "Italic",
          command: "italic",
          icon: "fa-italic"
        },

        {
          name: "Underline",
          title: "Underline",
          command: "underline",
          icon: "fa-underline"
        },

        {
          name: "AlignLeft",
          title: "Align Left",
          command: "justifyLeft",
          icon: "fa-align-left"
        },

        {
          name: "AlignJustify",
          title: "Align Justify",
          command: "justifyFull",
          icon: "fa-align-justify"
        },

        {
          name: "AlignCenter",
          title: "Align Center",
          command: "justifyCenter",
          icon: "fa-align-center"
        },

        {
          name: "AlignRight",
          title: "Align Right",
          command: "justifyRight",
          icon: "fa-align-right"
        }
      ],
      currentTagName: "",
      command: ""
    };
  },
  computed: {
    ...mapState("Editor", [
      "bigFont",
      "smallFont",
      "lineHeight",
      "fontFamily",
      "currentTab"
    ])
  },
  // watch: {
  //   currentTagName() {
  //     debugger;
  //     console.log(this.currentTagName);
  //     this.getCurrentTagName();
  //   }
  // },
  methods: {
    ...mapActions("Cv", ["initState", "createCommand"]),
    // exec(command, arg) {
    //   document.execCommand(command, false, arg);
    // },
    // clear() {
    //   document.getElementById("editor").innerHTML = "";
    // },
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
      // this.currentTab = this.subComponents[index];
    },
    finished: function(id) {
      // console.log(id);
      // this.currentTab = this.subComponents[id];
    },
    saveCV: function() {
      this.save = !this.save;
    }
  },
  created() {
    // set state
    this.initState(CV1);
  }
};
</script>
