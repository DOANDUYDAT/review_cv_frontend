<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="5">
        <v-card class="mx-auto">
          <v-list>
            <v-list-item-group>
              <v-list-item v-for="(item, i) in catalogs" :key="i">
                <v-checkbox color="darken-3" v-model="item.checked">
                </v-checkbox>
                <v-list-item-content>
                  <v-list-item-title v-text="item.title"></v-list-item-title>
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
      <!-- <v-row justify="center" align="center">
              <v-col cols="12">
                  <v-row>
                      <v-col cols="4">
                          <v-icon v-text="icon" class="mr-2" :size="iconSize"></v-icon>
                  <span >Bố cục mặc định</span>
                      </v-col>
                      <v-col cols="4">
                          <v-icon class="mr-2" :size="iconSize"> mdi-checkbox-marked-circle-outline</v-icon>
                  <span>Chọn hết</span>
                      </v-col>
                      <v-col cols="4">
                          <v-icon v-text="icon" class="mr-2" :size="iconSize"></v-icon>
                  <span>Bỏ chọn hết</span>
                      </v-col>
                  </v-row>
                  <v-row class="mx-auto">
                      <v-btn depressed color="primary">
                          Cap nhat
                      </v-btn>
                      <v-btn>
                          Huy
                      </v-btn>
                  </v-row>
                  

            </v-col> 
        </v-row> -->
      <div class="button__list mt-5">
        <div class="button__item">
          <v-btn color="primary" depressed>Cập nhật</v-btn>
        </div>
        <div class="button__item">
          <v-btn depressed>Hủy</v-btn>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "AddCV",
  data: () => ({
    icon: "mdi-menu",
    iconSize: "14px",
    catalogs: [
      {
        title: "Cac ky nang",
        checked: true
      },
      {
        title: "Muc tieu nghe nghiep",
        checked: true
      },
      {
        title: "Hoc van",
        checked: true
      },
      {
        title: "Giai thuong",
        checked: true
      },
      {
        title: "So thich",
        checked: true
      },
      {
        title: "Kinh nghiem lam viec",
        checked: true
      },
      {
        title: "Hoat dong",
        checked: true
      },
      {
        title: "Chung chi",
        checked: true
      },
      {
        title: "Thong tin them",
        checked: true
      },
      {
        title: "Nguoi tham chieu",
        checked: true
      },
      {
        title: "Du an",
        checked: true
      }
    ]
  }),
  components: {},
  methods: {
    changeChecked() {
      this.catalogs.map(catalog => {
        catalog.checked = false;
      });
    },
    allChecked() {
      this.catalogs.map(catalog => {
        catalog.checked = true;
      });
    }
  }
};
</script>
<style lang="scss">
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
