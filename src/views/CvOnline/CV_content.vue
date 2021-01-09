<template>
  <!-- <v-container v-bind:class="{ 'font-size': this.option + '!important' }"> -->
  <v-row>
    <v-col cols="8" style="background-color: white">
      <!-- <div class="cv_title">
        <input type="text" v-model="title_cv" />
      </div> -->
      <div
        contenteditable
        class="text-center"
        @blur="editTitle"
        v-html="title_cv"
        @keypress.enter="handleEnterTitle"
      >
        {{ title_cv }}
      </div>
      <div class="main_cv">
        <div class="cv__infor item__cv" @click="showDesc">
          <div class="cv__infor--content" v-if="currentUser">
            <div class="cv__name">
              <input type="text" readonly value="Doan Duy Dat" />
            </div>
            <!-- <div class="cv__address">
              <input type="text" />
            </div> -->
            <div class="social__list">
              <div class="social__item">
                <v-icon> mdi-phone</v-icon>
                <input
                  class="cv__phone"
                  type="text"
                  readonly
                  :value="currentUser.user.phone"
                />
              </div>
              <div class="social__item">
                <v-icon>mdi-email</v-icon>
                <input
                  type="text"
                  class="cv__mail"
                  readonly
                  value="dada@gmail.com"
                />
              </div>
              <!-- <div class="social__item">
                <v-icon>mdi-facebook</v-icon>
                <input type="text" class="cv__facebook" />
              </div> -->
            </div>
          </div>
          <div class="option">
            <v-icon @click="changeTab('AddCV')"> mdi-menu</v-icon>
          </div>
        </div>
        <div v-for="item in contentOrdered" :key="item.order">
          <component
            :is="item.isShow ? item.type : ''"
            :data="item"
            :bigfont="bigfont"
            :smallFont="smallfont"
            :lineheight="lineHeight"
            :fontfamily="fontFamily"
            @finished="finished"
            @editor="editor"
            @click.native="changeSideTab(item.order)"
          />
        </div>
        <!-- <GoalJob></GoalJob>
          <Education></Education>
          <Skills></Skills>
          <Rewards></Rewards>
          <Hobbies></Hobbies> -->
      </div>
    </v-col>
    <v-col cols="4">
      <component :is="sideTab" class="sidebar-sticky" />
    </v-col>
  </v-row>
  <!-- <div class="d-flex">
      <v-container>
        <v-row justify="end">
          <v-col cols="4">
            <component :is="sideTab" />
          </v-col>
        </v-row>
      </v-container>
    </div> -->
  <!-- </v-container> -->
</template>
<script>
import Personal_Info from "@/views/Instructions_CV/Personal_Info";
import Goal_Job from "@/views/Instructions_CV/Goal_Job";
import Hobby from "@/views/Instructions_CV/Hobby";
import Learning_skill from "@/views/Instructions_CV/Learning_skill";
import Skill from "@/views/Instructions_CV/Skill";
// import Personal_Info from "@/views/Instructions_CV/Personal_Info";
// import Personal_Info from "@/views/Instructions_CV/Personal_Info";
import Education from "./BaseComponent/Education";
import GoalJob from "./BaseComponent/GoalJob";
import Skills from "./BaseComponent/Skills";
import Rewards from "./BaseComponent/Rewards";
import Hobbies from "./BaseComponent/Hobbies";

import memberService from "@/api/member";
import authService from "@/api/authentication";
import { mapState, mapActions } from "vuex";

export default {
  name: "ContentCV",
  components: {
    Personal_Info,
    Goal_Job,
    Hobby,
    Skill,
    Learning_skill,
    Education,
    GoalJob,
    Skills,
    Rewards,
    Hobbies
  },
  data() {
    return {
      title_cv: "<b>Untitled </b> CV",
      cv: {},
      sideTab: "Skill",
      sideTabList: [
        "Personal_Info",
        "Goal_Job",
        "Hobby",
        "Learning_skill",
        "Skill"
      ],
      currentUser: null
    };
  },
  props: ["option", "bigfont", "smallfont", "lineHeight", "fontFamily"],
  computed: {
    ...mapState({
      currentCv: state => state.Cv.cv
    }),
    contentOrdered() {
      const contentCv = [...this.cv.content];
      contentCv.sort((a, b) => a.order - b.order);
      return contentCv;
    }
  },
  methods: {
    ...mapActions("Editor", ["changeTab"]),
    editTitle(e) {
      this.title_cv = e.target.innerHTML;
    },
    handleEnterTitle(e) {
      e.preventDefault();
    },
    showDesc() {
      this.desc = !this.desc;
    },
    deleteItem(event) {
      const hiddenItem = event.target.parentNode.parentNode.parentNode.remove();
      console.log(hiddenItem);
      console.log(event);
    },
    addItem(event) {
      const oldItem = event.target.parentNode.parentNode.parentNode.parentNode;
      console.log(oldItem);
      const newItem = oldItem.cloneNode(true);
      console.log(newItem);
      oldItem.after(newItem);
    },
    deleteContent(event) {
      event.target.parentNode.parentNode.parentNode.parentNode.remove();
    },
    finished() {
      this.$emit("finished", 1);
    },
    editor() {
      this.$emit("editor");
    },
    changeSideTab(id) {
      this.sideTab = this.sideTabList[id];
    },
    async getData() {
      const userId = await authService.getCurrentUserId();
      const member = await memberService.getMember(userId);
      this.currentUser = member;
    }
  },
  created() {
    this.cv = this.currentCv;
    this.getData();
  }
};
</script>
<style lang="scss">
@import "@/styles/styleComponentCV.scss";
[contenteditable] {
  outline: 0px solid transparent;
}
</style>
<style lang="scss" scoped>
.sidebar-sticky {
  position: sticky;
  top: 85px;
}
</style>
