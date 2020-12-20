<template>
  <v-container>
    <v-sheet class="pa-4">
      <v-row>
        <v-col cols="9"> </v-col>
        <v-col cols="3">
          <v-row>
            <v-col cols="4" class="text-center" align-self="center">
              <v-avatar color="grey darken-1" size="70">
                <v-img src="../../assets/avatar.jpg"></v-img>
              </v-avatar>
            </v-col>
            <v-col cols="8">
              <h4>CV được review bởi</h4>
              <h4>Chuyên gia</h4>
              <h3>Nguyễn Văn A</h3>
            </v-col>
          </v-row>
          <v-row align="end">
            <v-col cols="1">
              <v-icon small>mdi-domain</v-icon>
            </v-col>
            <v-col cols="5" class="body-2">
              Công ty Viettel
            </v-col>
            <v-col cols="1">
              <v-icon small>mdi-map-marker</v-icon>
            </v-col>
            <v-col cols="5" class="body-2">
              Hà Nội
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col cols="12" class="text-center pb-0 text-uppercase">
              <h3>Bạn có muốn</h3>
            </v-col>
            <v-col cols="12" class="text-center py-0">
              <h4>Public thông tin liên hệ?</h4>
            </v-col>
            <v-col cols="1">
              <v-icon small>mdi-information</v-icon>
            </v-col>
            <v-col cols="11" class="pl-4">
              Nhà tuyển dụng có thể xem được thông tin liên hệ của bạn nếu bạn
              xác nhận public CV
            </v-col>
            <v-col cols="12" class="pt-0 text-center">
              <v-btn @click="publicCv" depressed outlined color="red">
                Public cv
              </v-btn>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col cols="1">
              <v-icon color="amber">mdi-star</v-icon>
            </v-col>
            <v-col
              cols="11"
              class="pl-6 py-0 text-uppercase"
              align-self="center"
            >
              <h4>Đánh giá kết quả review</h4>
            </v-col>
            <v-col cols="12" class="py-0">
              <v-radio-group v-model="radioGroup" class="mt-0">
                <v-radio label="Hài lòng" value="radio-1"></v-radio>
                <v-radio label="Bình thường" value="radio-2"></v-radio>
                <v-radio label="Không hài lòng" value="radio-3"></v-radio>
              </v-radio-group>
            </v-col>
            <v-col cols="12" class="pt-0 text-center">
              <v-btn @click="rating" depressed outlined color="blue">
                Đánh giá
              </v-btn>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col cols="2" class="py-0">
              <v-btn @click.stop="dialog2 = true" small text fab>
                <v-icon>mdi-message-text</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="10" class="py-0 text-uppercase" align-self="center">
              <h4>Bắt đầu trò chuyện</h4>
            </v-col>
            <v-col cols="2" class="py-0">
              <v-btn @click.stop="dialog = true" small text fab>
                <v-icon>mdi-message-alert-outline</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="10" class="py-0 text-uppercase" align-self="center">
              <h4>Báo cáo</h4>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-dialog v-model="dialog" max-width="450">
        <v-card>
          <v-card-title>
            <div class="flex-grow-1 text-center headline">Báo cáo</div>
            <div class="float-right">
              <v-btn fab small elevation="0" @click="dialog = false">
                <v-icon>
                  mdi-close
                </v-icon>
              </v-btn>
            </div>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="py-4">
            <h2 class="mb-2 font-weight-regular">
              Cho chúng tôi biết chuyện gì đang xảy ra
            </h2>
            <span
              >Hãy cho chúng tôi biết các vấn đề với kết quả review này.</span
            >
            <v-chip-group class="mt-2" column active-class="primary">
              <!-- <v-chip class="ma-2" color="primary">
                Primary
              </v-chip> -->
              <v-chip class="mx-1" v-for="tag in tags" :key="tag">
                {{ tag }}
              </v-chip>
            </v-chip-group>
            <v-row>
              <v-col cols="1" class="pb-0"> <v-icon>mdi-alert</v-icon></v-col>
              <v-col cols="11" class="pb-0"
                ><span>
                  Nếu bạn nhận thấy review kém chất lượng, đừng chần chừ mà hãy
                  báo cáo ngay.
                </span></v-col
              >
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="px-6">
            <v-spacer></v-spacer>
            <v-btn color="primary" dark @click="dialog = false">
              Gửi
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialog2" max-width="450">
        <v-card class="elevation-4">
          <v-toolbar>
            <v-toolbar-title>Chat</v-toolbar-title>
            <v-spacer></v-spacer>
            <!-- <div class="flex-grow-1 text-center headline">Báo cáo</div> -->
            <div class="float-right">
              <v-btn fab small elevation="0" @click="dialog2 = false">
                <v-icon>
                  mdi-close
                </v-icon>
              </v-btn>
            </div>
          </v-toolbar>
          <v-card-text>
            <v-list ref="chat" id="logs">
              <template v-for="(item, index) in logs">
                <!-- <v-subheader v-if="item" :key="index">{{ item }}</v-subheader> -->
                <div
                  v-if="item"
                  :key="index"
                  :class="{ 'd-flex flex-row-reverse': item.me }"
                >
                  <v-menu offset-y>
                    <template v-slot:activator="{ on }">
                      <v-chip
                        :color="item.me ? 'primary' : 'grey'"
                        dark
                        style="height:auto;weight:220px;white-space: normal;"
                        class="pa-2 mb-2"
                        v-on="on"
                      >
                        {{ item.content }}
                      </v-chip>
                    </template>
                  </v-menu>
                </div>
              </template>
            </v-list>
          </v-card-text>
          <v-card-actions>
            <v-text-field
              placeholder="Nhập vào đây để trò chuyện"
              outlined
              v-model="msg.content"
              append-outer-icon="mdi-send"
              @keyup.enter="submit"
              @click:append-outer="submit"
            >
            </v-text-field>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-sheet>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      status: false,
      dialog: false,
      dialog2: false,
      radioGroup: null,
      tags: [
        "Review không chính xác",
        "Không có ý định review",
        "Ngôn từ gây thù ghét",
        "Review sơ sài",
        "Spam",
        "Vấn đề khác"
      ],
      logs: [
        {
          content: "lorem ipsum",
          me: true
        },
        {
          content: "dolor",
          me: false
        }
      ],
      msg: {
        content: "",
        me: true
      }
    };
  },
  methods: {
    async publicCv() {
      const result = await this.$swal({
        icon: "question",
        title: "Bạn có muốn public CV này?",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy"
      });
      if (result.isConfirmed) {
        this.status = !this.status;
        try {
          await this.$swal({
            title: "Public CV thành công",
            icon: "success"
          });
        } catch (err) {
          await this.$swal({
            title: "Thất bại",
            text: err,
            icon: "error"
          });
        }
      }
    },
    rating() {
      this.$swal({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Đánh giá kết quả review thành công",
        showConfirmButton: false,
        timer: 1500
      });
    },
    downloadCv() {
      console.log("download CV");
    },
    submit() {
      const data = Object.assign({}, this.msg);
      this.logs.push(data);
      this.msg.content = "";
    }
  },
  watch: {
    logs() {
      setTimeout(() => {
        this.$refs.chat.$el.scrollTop = this.$refs.chat.$el.scrollHeight;
      }, 500);
    }
  }
};
</script>
<style lang="scss" scoped>
#logs {
  height: 400px;
  overflow: auto;
}
.v-chip {
  max-width: 70%;
}
</style>
