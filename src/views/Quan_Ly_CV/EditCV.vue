<template>
  <v-container v-if="!save">
    <v-tabs class="service__list">
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
        <h3 class="service__title">Co chu</h3>
        <v-select :items="fonts" v-model="select_size" dense></v-select>
      </v-tab>
      <v-tab class="service__item">
        <h3 class="service__title">Co chu</h3>
        <div class="service__option">
          <button class="btn btn__font">
            <span>A</span>
          </button>
          <button class="btn btn__font active">
            <span class="mid_size">A</span>
          </button>
          <button class="btn btn__font large_size">
            <span class="large_size">A</span>
          </button>
        </div>
      </v-tab>
      <v-tab class="service__item">
        <h3 class="service__title">Cach dong</h3>
        <div class="service__option">
          <button class="btn btn__font">
            <v-icon class="smallSize">mdi-arrow-up</v-icon>
          </button>
          <button class="btn btn__font active">
            <v-icon class="mediumSize">mdi-arrow-up</v-icon>
          </button>
          <button class="btn btn__font large_size">
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
    <component v-bind:is="currentTab"></component>
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
export default {
  name: "EditCV",
  data: () => ({
    options: ["14px", "16px", "20px"],
    fonts: ["Times New Roman", "Arial", "Sans-serief", "Tahoma"],
    select_size: "Times New Roman",
    currentTab: "ContentCV",
    subComponents: ["ContentCV", "AddCV", "MauCV"],
    save: false,
    saveMessage: "",
    jobCount: 0,
    keyCV: "https://i.topcv.vn/ledinhduc?ref=3525428"
  }),
  methods: {
    currentTabComponent: function(id) {
      this.currentTab = this.subComponents[id];
    },
    saveCV: function() {
      this.save = !this.save;
    }
  },
  components: {
    AddCV,
    ContentCV,
    MauCV
    // VueEditor
  }
};
</script>
<style lang="scss">
.service__list {
  margin-bottom: 20px;
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
</style>
