<template>
  <v-container class="px-0">
    <!-- <ValidationObserver ref="filterProduct"> -->
    <!-- <v-btn-toggle> -->
    <v-row no-gutters justify="space-around">
      <v-col cols="5">
        <v-btn @click="resetFilter" depressed outlined color="red"
          >Xóa bộ lọc</v-btn
        >
      </v-col>

      <v-col cols="5">
        <v-btn
          depressed
          color="red"
          class="white--text"
          :loading="loading"
          :disabled="loading"
          @click="submit"
          width="100%"
          >Áp dụng</v-btn
        >
      </v-col>
    </v-row>
    <!-- <v-btn :loading="loading" :disabled="loading" @click="loader = 'loading'">Accept Terms 2</v-btn> -->
    <!-- </v-btn-toggle> -->
    <!-- <v-container fluid> -->
    <v-list>
      <template v-for="item in items">
        <v-list-group no-action :key="item.text">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list shaped>
            <v-list-item-group v-model="filter[item.model]" multiple>
              <template v-for="(child, i) in item.children">
                <v-divider v-if="!child" :key="`divider-${i}`"></v-divider>
                <v-list-item
                  v-else
                  :key="`child.text-${i}`"
                  :value="child.text"
                  active-class="deep-purple--text text--accent-4"
                >
                  <template v-slot:default="{ active }">
                    <v-list-item-content>
                      <v-list-item-title
                        v-text="child.text"
                      ></v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-checkbox
                        :input-value="active"
                        :true-value="child.text"
                        color="deep-purple accent-4"
                      ></v-checkbox>
                    </v-list-item-action>
                  </template>
                </v-list-item>
              </template>
            </v-list-item-group>
          </v-list>
        </v-list-group>
      </template>
    </v-list>
    <!-- </v-container> -->
    <!-- </ValidationObserver> -->
  </v-container>
</template>

<script>
import _ from "lodash";
// import { supplierService, filterService } from "@/_api";
export default {
  data() {
    return {
      filter: {
        field: [],
        experience: [],
        level: [],
        time: []
      },
      loading: false,
      items: [
        {
          text: "Lĩnh vực làm việc",
          model: "field",
          children: [
            { text: "IT" },
            { text: "Kế toán/Kiểm toán" },
            { text: "Luật" },
            { text: "Bảo hiểm" },
            { text: "Bất động sản" },
            { text: "Marketing/Truyền thông" },
            { text: "Nhà hàng/Khách sạn" },
            { text: "Xây dựng" },
            { text: "Ngân hàng" },
            { text: "Nhân sự" },
            { text: "Thiết kế/ Kiến trúc" },
            { text: "Thời trang" },
            { text: "Du lịch" }
          ]
        },
        {
          text: "Kinh nghiệm",
          model: "experience",
          children: [
            { text: "Chưa có" },
            { text: "Dưới 1 năm" },
            { text: "1 năm" },
            { text: "2 năm" },
            { text: "3 năm" },
            { text: "4 năm" },
            { text: "5 năm" },
            { text: "Trên 5 năm" }
          ]
        },
        {
          text: "Cấp bậc",
          model: "level",
          children: [
            { text: "Nhân viên" },
            { text: "Trưởng nhóm" },
            { text: "Quản lý/Giám sát" },
            { text: "Trưởng/Phó phòng" },
            { text: "Trưởng chi nhánh" },
            { text: "Phó giám đốc" },
            { text: "Giám đốc" },
            { text: "Thực tập sinh" }
          ]
        },
        {
          text: "Thời gian",
          model: "time",
          children: [{ text: "Fulltime" }, { text: "Parttime" }]
        }
      ]
    };
  },
  methods: {
    loader() {
      this.loading = true;
      setTimeout(() => (this.loading = false), 1000);
    },
    async submit() {
      const filter = this.filter;
      const oldFilter = this.$route.query;
      let query = {};
      if (filter.field.length) {
        query = { ...query, field: filter.field };
      }
      if (filter.experience.length) {
        query = { ...query, experience: filter.experience };
      }
      if (filter.level.length) {
        query = { ...query, level: filter.level };
      }
      if (filter.time.length) {
        query = { ...query, time: filter.time };
      }
      if (!_.isEmpty(query) && !_.isEqual(query, oldFilter)) {
        this.$router.push({ path: "/filter", query: query });
      }

      // if (!_.isEmpty(filter) && !_.isEqual(filter, oldFilter)) {
      //   this.$router.push({ path: "/filter", query: filter });
      // }
    },
    resetFilter() {
      this.filter.field = [];
      this.filter.experience = [];
      this.filter.level = [];
      this.filter.time = [];
    },
    async getData() {}
  },

  created() {
    this.getData();
  }
};
</script>

<style lang="scss" scoped>
// @import "@/variables.scss";
.container {
  background-color: white;
}
</style>
