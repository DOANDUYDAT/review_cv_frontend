<template>
  <v-container>
    <v-row>
      <v-col cols="9"></v-col>
      <v-col cols="3">
        <v-row>
          <v-col cols="3" class="text-center" align-self="center">
            <v-avatar color="grey darken-1" size="50">
              <v-img src="../../assets/avatar.jpg"></v-img>
            </v-avatar>
          </v-col>
          <v-col cols="9">
            <h3>Nguyễn Văn A</h3>
            <span>Thực tập sinh</span>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="1" class="py-0">
            <v-icon small>mdi-briefcase-variant</v-icon>
          </v-col>
          <v-col cols="5" class="py-0">
            1 năm
          </v-col>
          <v-col cols="1" class="py-0">
            <v-icon small>mdi-sort-descending</v-icon>
          </v-col>
          <v-col cols="5" class="py-0">
            Thực tập sinh
          </v-col>
          <v-col cols="1" class="py-0">
            <v-icon small>mdi-briefcase-account</v-icon>
          </v-col>
          <v-col cols="5" class="py-0">
            IT
          </v-col>
          <v-col cols="1" class="py-0">
            <v-icon small>mdi-map-marker</v-icon>
          </v-col>
          <v-col cols="5" class="py-0">
            Hà Nội
          </v-col>
        </v-row>
        <v-divider></v-divider>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.container {
  background-color: white;
}
</style>
