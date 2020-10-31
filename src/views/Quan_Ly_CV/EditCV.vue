<template>
  <v-container>
    <v-tabs class="service__list">
      <v-tab class="service__item large_padding" to="/content">
        <h3 class="service__title">Tông màu</h3>
        <div class="service__option">
          <button class="btn btn__font default_hover">
            <v-icon class="mediumSize"> mdi-check</v-icon>
          </button>
        </div>
      </v-tab>
      <v-tab class="service__item">
        <h3 class="service__title">Co chu</h3>
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
        <!-- </v-col>
    </v-row>
    </v-container> -->
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
      <v-tab class="service__item large_padding">
        <h3 class="service__title">Thêm mục</h3>
        <div class="service__option">
          <button class="btn btn__font default_hover">
            <v-icon class="mediumSize"> mdi-plus-circle</v-icon>
          </button>
        </div>
      </v-tab>
      <v-tab class="service__item large_padding">
        <h3 class="service__title">Đổi mẫu CV</h3>
        <div class="service__option">
          <button class="btn btn__font default_hover">
            <v-icon class="mediumSize"> mdi-file-outline</v-icon>
          </button>
        </div>
      </v-tab>
      <v-tab class="service__item large_padding">
        <h3 class="service__title">Lưu CV</h3>
        <div class="service__option">
          <button class="btn btn__font default_hover">
            <v-icon class="mediumSize"> mdi-server</v-icon>
          </button>
        </div>
      </v-tab>
    </v-tabs>
    <!-- <VueEditor ></VueEditor>
    <AddCV></AddCV> -->
    <router-view></router-view>
  </v-container>
</template>
<script>
// import AddCV from './Add_CV'
// import VueEditor from './Editor'
export default {
  name: "EditCV",
  data: () => ({
    options: ["14px", "16px", "20px"],
    fonts: ["Times New Roman", "Arial", "Sans-serief", "Tahoma"],
    select_size: "Times New Roman"
  }),
  components: {
    // AddCV,
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
}</style
>>
