<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="5">
        <v-card class="mx-auto">
          <v-list>
            <v-list-item-group>
              <v-list-item v-for="(item, i) in contentCV" :key="i">
                <v-checkbox color="darken-3" v-model="item.isShow">
                </v-checkbox>
                <v-list-item-content>
                  <v-list-item-title v-text="item.type"></v-list-item-title>
                </v-list-item-content>
                <v-list-item-icon>
                  <v-icon v-text="icon" right></v-icon>
                </v-list-item-icon>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
    <div class="option_addCata">
      <div class="option__list">
        <div class="option__item">
          <v-icon v-text="icon" class="mr-2" :size="iconSize"></v-icon>
          <span>Bố cục mặc định</span>
        </div>
        <div class="option__item" @click="allChecked">
          <v-icon class="mr-2" :size="iconSize"
            >mdi-checkbox-marked-circle-outline</v-icon
          >
          <span>Chọn hết</span>
        </div>
        <div class="option__item" @click="changeChecked">
          <v-icon class="mr-2" :size="iconSize">
            mdi-checkbox-blank-circle-outline</v-icon
          >
          <span>Bỏ chọn hết</span>
        </div>
      </div>
      <div class="button__list mt-5">
        <div class="button__item">
          <v-btn color="primary" depressed @click="updateCateory()"
            >Cập nhật</v-btn
          >
        </div>
        <div class="button__item">
          <v-btn depressed>Hủy</v-btn>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "AddCV",
  data: () => ({
    icon: "mdi-menu",
    iconSize: "14px",
    catalogs: {}
    // contentCV: []
  }),
  components: {},
  computed: {
    ...mapState({
      currentCv: state => state.Cv.cv
    }), //get cv tu module Store Cv
    contentCV() {
      const cvContent = [...this.catalogs.content];
      // const cvContent = [];
      return cvContent;
    }
  },
  methods: {
    changeChecked() {
      this.catalogs.content.forEach(e => (e.isShow = false));
    },
    allChecked() {
      // this.contentCV = [...this.catalogs.content];
      const catalogCV = [...this.catalogs.content];
      catalogCV.forEach(e => {
        e.isShow = true;
      });
    },
    updateCateory() {
      this.initState(this.catalogs);
      this.$emit("finished", 0);
    },
    ...mapActions("Cv", ["initState"])
  },
  created() {
    this.catalogs = JSON.parse(JSON.stringify(this.currentCv));
    console.log(this.catalogs);
  }
};
</script>
<style lang="scss" scoped>
* {
  font-size: 14px;
}
body {
  height: 2000px;
}
.option_addCata {
  position: fixed;
  /* bottom: 0; */
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  z-index: 15;
  background: gray;
  padding: 10px;
  .option__list {
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    .option__item {
      font-size: 14px;
      margin-right: 20px;
      cursor: pointer;
      &:hover {
        color: lightgreen;
      }
    }
  }
  .button__list {
    display: flex;
    justify-content: center;
    .button__item:first-child {
      margin-right: 20px;
    }
  }
}
</style>
