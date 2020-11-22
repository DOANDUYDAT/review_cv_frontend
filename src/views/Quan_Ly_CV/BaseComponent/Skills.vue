<template>
  <div class="cv__skills item__cv">
    <div class="cv__infor--content ">
      <div class="cv__skills--title item__cv--title">
        <input type="text" value="CÁC KỸ NĂNG" />
      </div>
      <v-divider></v-divider>
      <div class="cv__skills--content content__cv">
        <v-container>
          <v-row>
            <v-col cols="4">
              <input
                type="text"
                value="Tin học văn phòng"
                class="cv__skills--key"
              />
            </v-col>
            <v-col cols="8">
              <input
                type="text"
                value="- Sử dụng thành thạo các công cụ Word, Excel, Power Point"
                class="cv__skills--value"
              />
            </v-col>
          </v-row>
          <div class="option__content">
            <v-btn color="success" @click="addItem($event)">
              <v-icon>mdi-plus</v-icon>
              Them
            </v-btn>
            <v-btn color="error" @click="deleteContent($event)">
              <v-icon>mdi-minus</v-icon>
              Xoa
            </v-btn>
          </div>
        </v-container>
      </div>
    </div>
    <div class="option">
      <v-icon> mdi-menu</v-icon>
      <v-icon> mdi-menu-down</v-icon>
      <v-icon> mdi-menu-up </v-icon>
      <v-btn color="error">
        <v-icon>mdi-minus</v-icon>
        An muc
      </v-btn>
    </div>
  </div>
</template>
<script>
export default {
  name: "Skills"
};
</script>
