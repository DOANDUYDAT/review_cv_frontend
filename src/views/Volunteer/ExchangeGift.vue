<template>
  <v-card>
    <v-toolbar class="px-8" dark flat>
      <v-card-title class="layout">
        <span class="headline">Đổi quà</span>
      </v-card-title>
    </v-toolbar>
    <v-card-text class="px-16 pt-8">
      <v-row>
        <v-col cols="12">
          <h2 class="font-weight-regular">
            Số điểm thưởng hiện tại của bạn là: 50 điểm
          </h2>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions class="px-16 pb-8">
      <v-btn rounded color="#007ddd" class="white--text px-4" @click="accept">
        Điểm uy tín
      </v-btn>
      <v-btn rounded color="#007ddd" class="white--text px-4" @click="decline">
        Điểm thưởng
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.v-toolbar {
  background-image: linear-gradient(0.25turn, #00bda0 30%, #007ddd);
}
</style>
