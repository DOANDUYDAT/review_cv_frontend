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
export default {
  data() {
    return {
      filter: {
        field: [],
        exp: [],
        position: [],
        timeType: []
      },
      loading: false,
      items: [
        {
          text: "Lĩnh vực làm việc",
          model: "field",
          children: [
            { text: "An toàn lao động" },
            { text: "Bất động sản" },
            { text: "Bưu chính - Viễn thông" },
            { text: "Công nghệ thông tin" },
            { text: "Dệt may/Da giày" },
            { text: "Điện tử viễn thông" },
            { text: "Du lịch" },
            { text: "Kế toán/Kiểm toán" },
            { text: "Luật/Pháp lý" },
            { text: "Quản lý điều hành" }
          ]
        },
        {
          text: "Kinh nghiệm",
          model: "exp",
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
          model: "position",
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
          text: "Thời gian làm việc",
          model: "timeType",
          children: [{ text: "Full-time" }, { text: "Part-time" }]
        }
      ]
    };
  },
  methods: {
    loader() {
      this.loading = true;
      setTimeout(() => (this.loading = false), 1000);
    },
    submit() {
      const { field, exp, timeType, position } = this.filter;
      this.$emit("filter-cv", {
        field,
        exp,
        timeType,
        position
      });
    },
    resetFilter() {
      this.filter.field = [];
      this.filter.exp = [];
      this.filter.position = [];
      this.filter.timeType = [];
    }
  }
};
</script>

<style lang="scss" scoped>
// @import "@/variables.scss";
.container {
  background-color: white;
}
</style>
