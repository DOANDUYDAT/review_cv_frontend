<template>
  <v-container v-if="!save">
    <v-tabs class="service__list sticky-top sticky-top__head">
      <v-tab
        class="service__item large_padding"
        @click="currentTabComponent(0)"
      >
        <h3 class="service__title">Tông màu</h3>
        <div class="service__option">
          <button class="btn btn__font default_hover">
            <v-icon class="mediumSize"> mdi-check</v-icon>
          </button>
        </div>
      </v-tab>
      <v-tab class="service__item">
        <h3 class="service__title">Font chữ</h3>
        <!-- <div class="service__option">
                <button class="btn btn__font">
                    <span>A</span>
                </button>
                <button class="btn btn__font active">
                    <span class="mid_size">A</span>
                </button>
                <button class="btn btn__font large_size">
                    <span class="large_size">A</span>
                </button>

    </div> -->
        <!-- <v-container>
    <v-row align="center">
      <v-col
        class="d-flex"
        cols="12"
        sm="6"
      > -->
        <v-select :items="fonts" v-model="select_size" dense></v-select>
      </v-tab>
      <v-tab class="service__item">
        <h3 class="service__title">Cỡ chữ</h3>
        <div class="service__option">
          <button class="btn btn__font" @click="fontDecrease()">
            <span>A</span>
          </button>
          <button class="btn btn__font active" @click="fontDefault()">
            <span class="mid_size">A</span>
          </button>
          <button class="btn btn__font large_size" @click="fontIncrease()">
            <span class="large_size">A</span>
          </button>
        </div>
      </v-tab>
      <v-tab class="service__item">
        <h3 class="service__title">Cách dòng</h3>
        <div class="service__option">
          <button class="btn btn__font" @click="heightDecrease()">
            <v-icon class="smallSize">mdi-arrow-up</v-icon>
          </button>
          <button class="btn btn__font active" @click="heightDefault()">
            <v-icon class="mediumSize">mdi-arrow-up</v-icon>
          </button>
          <button class="btn btn__font large_size" @click="heightIncrease()">
            <v-icon class="largeSize">mdi-arrow-up</v-icon>
          </button>
        </div>
      </v-tab>
      <v-tab
        class="service__item large_padding"
        @click="currentTabComponent(1)"
      >
        <h3 class="service__title">Thêm mục</h3>
        <div class="service__option">
          <button class="btn btn__font default_hover">
            <v-icon class="mediumSize"> mdi-plus-circle</v-icon>
          </button>
        </div>
      </v-tab>
      <v-tab
        class="service__item large_padding"
        @click="currentTabComponent(2)"
      >
        <h3 class="service__title">Đổi mẫu CV</h3>
        <div class="service__option">
          <button class="btn btn__font default_hover">
            <v-icon class="mediumSize"> mdi-file-outline</v-icon>
          </button>
        </div>
      </v-tab>
      <v-tab class="service__item large_padding" @click="saveCV">
        <h3 class="service__title">Lưu CV</h3>
        <div class="service__option">
          <button class="btn btn__font default_hover">
            <v-icon class="mediumSize"> mdi-server</v-icon>
          </button>
        </div>
      </v-tab>
    </v-tabs>
    <div
      class="mx-5 my-3 d-flex justify-content-center sticky-top editor__list"
    >
      <div
        v-for="(item, index) in commands"
        :key="index"
        class="btn-group"
        :class="{ 'border-right': borderRight(index) }"
      >
        <button
          type="button"
          class="btn btn-sm btn-outline-secondary border-0 editor__btn"
          data-toggle="tooltip"
          data-placement="bottom"
          :title="item.title"
          @click="createCommand(item.command)"
        >
          <i :class="'fa ' + item.icon"></i>
        </button>
      </div>
    </div>
    <component
      v-bind:is="currentTab"
      @finished="finished"
      :bigfont="bigFont"
      :smallfont="smallFont"
      :lineHeight="activeLineHeight"
      :fontFamily="select_size"
      class="editor border mt-2"
    ></component>
  </v-container>
  <v-container v-else>
    <v-row class="spaceColumn">
      <v-col cols="6">
        <h2>
          <v-icon>mdi-check</v-icon>
          {{ saveMessage }}
        </h2>
        <p class="keyCV">{{ keyCV }}</p>
        <v-row class="spaceColumn">
          <v-btn @click="saveCV">
            <v-icon>mdi-pencil</v-icon>
            Sua lai CV
          </v-btn>
          <v-btn>
            <v-icon>mdi-eye</v-icon>
            Xem
          </v-btn>
          <v-btn>
            <v-icon>mdi-download</v-icon>
            Tai xuong
          </v-btn>
        </v-row>
      </v-col>
      <v-col cols="6" class="jobFound">
        <h2>Co {{ jobCount }} cong viec phu hop voi ban</h2>
        <v-btn color="success">Xem ngay</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import AddCV from "./Add_CV";
import ContentCV from "./CV_content";
import MauCV from "./MauCV";
// import VueEditor from './Editor'

const CV1 = {
  cvId: "1",
  userId: "12a",
  name: "CV thực tập",
  link: "",
  createAt: "22/10/2020",
  updatedAt: "22/11/2020",
  content: [
    {
      order: 1,
      name: "Mục Tiêu",
      isShow: true,
      type: "GoalJob",
      content: [
        {
          name: "Côngty 1",
          value: "react",
          id: "1"
        },
        {
          name: "Côngty 2",
          value: "vue",
          id: "2"
        }
      ]
    },
    {
      order: 3,
      type: "Education",
      isShow: true,
      name: "Học vấn",
      content: [
        {
          name: "Bằng 1",
          value: "ktqd",
          id: "1"
        },
        {
          name: "Bằng 2",
          value: "bk",
          id: "2"
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
          value: "vue",
          id: "2"
        }
      ]
    }
  ]
};

import { mapActions } from "vuex";

export default {
  name: "EditCV",
  data: () => ({
    bigFont: 24,
    smallFont: 16,
    fontSize: [24, 16],
    lineHeight: 6,
    activeLineHeight: 6,
    fonts: ["Times New Roman", "Arial", "Sans-serief", "Tahoma"],
    select_size: "Times New Roman",
    currentTab: "ContentCV",
    subComponents: ["ContentCV", "AddCV", "MauCV"],
    save: false,
    saveMessage: "",
    jobCount: 0,
    keyCV: "https://i.topcv.vn/ledinhduc?ref=3525428",
    Cv: {},
    commands: [
      { name: "Bold", title: "Bold", command: "bold", icon: "fa-bold" },

      { name: "Italic", title: "Italic", command: "italic", icon: "fa-italic" },

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
  }),
  // watch: {
  //   currentTagName() {
  //     debugger;
  //     console.log(this.currentTagName);
  //     this.getCurrentTagName();
  //   }
  // },
  methods: {
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
    currentTabComponent: function(id) {
      this.currentTab = this.subComponents[id];
    },
    fontIncrease: function() {
      if (this.currentTab == "ContentCV") {
        this.bigFont += 4;
        this.smallFont += 4;
      }
    },
    fontDecrease: function() {
      if (this.currentTab == "ContentCV") {
        this.bigFont -= 4;
        this.smallFont -= 4;
      }
    },
    fontDefault: function() {
      if (this.currentTab == "ContentCV") {
        this.bigFont = this.fontSize[0];
        this.smallFont = this.fontSize[1];
      }
    },
    heightDecrease: function() {
      this.activeLineHeight = this.lineHeight - 4;
    },
    heightDefault: function() {
      this.activeLineHeight = this.lineHeight;
    },
    heightIncrease: function() {
      this.activeLineHeight = this.lineHeight + 4;
    },
    finished: function(id) {
      console.log(id);
      this.currentTab = this.subComponents[id];
    },
    saveCV: function() {
      this.save = !this.save;
    },
    ...mapActions("Cv", ["initState", "createCommand"])
  },
  components: {
    AddCV,
    ContentCV,
    MauCV
    // VueEditor
  },
  created() {
    // set state
    this.initState(CV1);
  }
};
</script>
<style lang="scss">
.service__list {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}
.service__item {
  padding: 10px;
  display: inline-block;
  padding-bottom: 20px;
  border: 1px solid lightgray;
  border-right-width: 0;
  cursor: pointer;
  .service__title {
    text-align: center;
    /* margin-bottom: 10px; */
    font-weight: 400;
  }
  // .service__option {

  // }
  .btn {
    text-align: center;
    background-color: white;
    margin: 0 2px;
    border-radius: 50%;
    line-height: 23px;
    gap: normal;
    padding: 0 8px;
    color: hsl(0, 0, 40%);

    span {
      display: inline-block;
      gap: normal;
      font-size: 10px;
      line-height: 22px;
      // text-align: center;
    }
    .mid_size {
      font-size: 14px;
    }
    .large_size {
      font-size: 18px;
    }
  }
  .btn.active {
    background-color: hsl(0, 0, 40%);
    .v-icon,
    span {
      color: white;
    }
  }
  .btn.btn__font:hover:not(.default_hover) {
    background-color: hsl(0, 0, 40%);
    .v-icon,
    span {
      color: white;
    }
  }
}
.service__item:last-child {
  border-right-width: 1px;
  background-color: lightgreen;
  color: white;
}

.service__item.v-tab {
  flex-direction: column;
}

.service__option {
  display: flex;
  justify-content: center;
}

// style select option
.v-input.v-text-field {
  padding-top: 12px;
  margin-top: -2px;
}

.v-input--dense > .v-input__control > .v-input__slot {
  margin-bottom: 0px;
}

.v-select__selections {
  width: 94px;
}

.v-input__control .v-text-field__details {
  min-height: 0;
  .v-messages {
    min-height: 0;
  }
}
.large_padding {
  padding: 10px 25px;
  padding-bottom: 20px;
}
.smallSize {
  font-size: 10px;
}

.mediumSize {
  font-size: 14px;
}

.largeSize {
  font-size: 18px;
}

.v-tabs-bar {
  height: auto;
}
.keyCV {
  border-radius: 10px;
  text-align: center;
  border: 2px solid gray;
  padding: 15px;
  margin-top: 20px;
}
.spaceColumn {
  justify-content: space-between;
  margin-top: 50px;
}
.jobFound {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
}
.col-6 {
  padding: 35px;
  /* margin-right: 50px; */
  background: #f1f1f1;
}
.col-6:last-child {
  margin-right: 0;
}
.editor__btn {
  padding: 15px;
  background: white;
  border: 1px solid lightgray;
  border-right: 0;
  /* margin-right: 10px; */
}
.editor__list .btn-group:first-of-type .editor__btn {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
.editor__list .btn-group:last-of-type .editor__btn {
  border-right: 1px solid lightgray;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}
.editor {
  min-height: 20em;
  padding: 1em;
}

// .btn:hover {
//   background: lighten(black, 90%);

//   color: lighten(black, 10%);
// }

[contenteditable]:focus {
  outline: none;
}

[contenteditable] {
  font-size: 120%;
}

.justify-content-center {
  justify-content: center;
}
.sticky-top {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  top: 84px;
  z-index: 1000;
  &__head {
    top: 0;
  }
}
.v-application .mt-2.editor {
  margin-top: 145px !important;
}
</style>
