<template>
  <v-container>
    <v-row>
      <v-col cols="8">
        <div class="cv_title">
          <input type="text" v-model="title_cv" />
        </div>
        <div class="main_cv">
          <div class="cv__infor item__cv" @click="showDesc">
            <div class="cv__infor--content">
              <div class="cv__name">
                <input type="text" />
              </div>
              <div class="cv__address">
                <input type="text" />
              </div>
              <div class="social__list">
                <div class="social__item">
                  <v-icon> mdi-phone</v-icon>
                  <input class="cv__phone" type="text" />
                </div>
                <div class="social__item">
                  <v-icon>mdi-email</v-icon>
                  <input type="text" class="cv__mail" />
                </div>
                <div class="social__item">
                  <v-icon>mdi-facebook</v-icon>
                  <input type="text" class="cv__facebook" />
                </div>
              </div>
            </div>
            <div class="option">
              <v-icon> mdi-menu</v-icon>
            </div>
          </div>
          <div v-for="item in contentOrdered" :key="item.id">
            <component :is="item.isShow ? item.type : ''" :data="item" />
          </div>
          <!-- <GoalJob></GoalJob>
          <Education></Education>
          <Skills></Skills>
          <Rewards></Rewards>
          <Hobbies></Hobbies> -->
        </div>
      </v-col>
      <v-col cols="4">
        <Personal></Personal>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Personal from "@/views/Instructions_CV/Personal_Info";
import Education from "@/views/Quan_Ly_CV/BaseComponent/Education";
import GoalJob from "@/views/Quan_Ly_CV/BaseComponent/GoalJob";
import Skills from "@/views/Quan_Ly_CV/BaseComponent/Skills";
import Rewards from "@/views/Quan_Ly_CV/BaseComponent/Rewards";
import Hobbies from "@/views/Quan_Ly_CV/BaseComponent/Hobbies";

import { mapState } from "vuex";

export default {
  name: "ContentCV",
  data() {
    return {
      title_cv: "Untitled CV",
      cv: {}
    };
  },
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
  components: {
    Personal,
    Education,
    GoalJob,
    Skills,
    Rewards,
    Hobbies
  },
  methods: {
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
    }
  },
  created() {
    this.cv = this.currentCv;
  }
};
</script>
<style lang="scss">
@import "@/styles/styleComponentCV.scss";
</style>
