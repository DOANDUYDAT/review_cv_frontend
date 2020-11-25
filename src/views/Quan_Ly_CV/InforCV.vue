<template>
  <v-container>
    <v-row>
      <v-col cols="4">
        <v-img
          lazy-src="https://picsum.photos/id/11/10/6"
          max-height="150"
          max-width="250"
          :src="inforCV.source"
        ></v-img>
      </v-col>
      <v-col cols="8">
        <v-row>
          <v-col cols="10">
            {{ inforCV.title }}
          </v-col>
          <v-col cols="2">
            {{ inforCV.date }}
          </v-col>
        </v-row>
        <v-row class="keyCv">
          <v-col cols="12">
            {{ inforCV.key }}
          </v-col>
        </v-row>
        <v-row class="optionButton">
          <v-btn>
            <v-icon> mdi-debug-step-out</v-icon>
            Day top
          </v-btn>
          <v-btn>
            <v-icon>mdi-star</v-icon>
            Dat CV chinh
          </v-btn>
          <v-btn>
            <v-icon>mdi-eye</v-icon>
            Xem
          </v-btn>
          <v-btn>
            <v-icon>mdi-download</v-icon>
            Tai xuong
          </v-btn>
          <v-btn href="/CV/edit">
            <v-icon>mdi-pencil</v-icon>
            Sua
          </v-btn>
          <v-btn @click="deleteCV(inforCV.id)">
            <v-icon>mdi-delete</v-icon>
            Xoa
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "InforCV",
  props: {
    infor: Object
  },
  data() {
    return {
      inforCV: this.infor
    };
  },
  methods: {
    deleteCV: function(id) {
      console.log(id);
    }
  },
  mounted: function() {
    console.log(this.infor);
  }
};
</script>
<style lang="scss">
.optionButton {
  .v-btn {
    margin-right: 15px;
  }
}

.keyCv {
  border: 1px dashed #eee;
  margin-bottom: 15px;
}
</style>
