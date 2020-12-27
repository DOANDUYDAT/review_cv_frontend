<template>
  <v-container>
    <v-row>
      <v-col cols="4"> </v-col>
      <v-col cols="4">
        <div class="maucv">
          <v-img src="https://picsum.photos/id/11/500/300"></v-img>
          <div class="nen">
            <div class="maucv__infor">
              <v-btn color="success" href="/CV/edit">
                <v-icon>mdi-check</v-icon>
                Dùng mẫu này
              </v-btn>
              <p>
                Mẫu thiết kế này thiết kế đặc trưng cho những ứng viên nhiều
                kinh nghiệm
              </p>
            </div>
          </div>
        </div>
      </v-col>
      <v-col cols="4"> </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "MauCV",
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.maucv {
  position: relative;
  color: white;
  .nen {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 15;
    display: none;
    text-align: center;
    padding: 10px;
    background-color: rgba($color: #000000, $alpha: 0.6);
    height: -webkit-fill-available;
    .v-btn {
      border-radius: 10px;
      padding: 5px 15px;
      margin-bottom: 20px;
    }
    .maucv__infor {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      transform: translateY(50%);
    }
  }
}
.maucv:hover {
  .nen {
    display: block;
  }
}
</style>
