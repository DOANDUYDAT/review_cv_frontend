<template>
  <v-sheet class="pa-4" v-if="review">
    <v-row>
      <v-col cols="9">
        <iframe
          :src="fileReview"
          width="100%"
          height="800px"
          frameborder="0"
        ></iframe>
      </v-col>
      <v-col cols="3">
        <v-row>
          <v-col cols="12" class="py-0 text-center" v-if="isPublic">
            <h3 style="color: white; background-color: rgb(92, 184, 92);">
              <v-icon dark>mdi-checkbox-marked-circle</v-icon> Đã public
            </h3>
          </v-col>
          <v-col cols="3" class="pb-0 text-center" align-self="center">
            <v-avatar color="grey darken-1" size="50">
              <v-img src="../../assets/avatar.jpg"></v-img>
            </v-avatar>
          </v-col>
          <v-col cols="9" class="pb-0" align-self="center">
            <h2>{{ review.cv.author.user.fullName }}</h2>
            <!-- <span>Thực tập sinh</span> -->
          </v-col>
          <v-col cols="12" v-if="isPublic">
            <v-card flat style="padding: inherit;border: 2px dashed grey;">
              <v-row>
                <h3 class="ml-3">Thông tin liên lạc</h3>
                <v-col cols="12" class="py-0">
                  <v-icon class="mr-4" small>mdi-phone-in-talk</v-icon>
                  <span class="body-2">{{ review.cv.author.user.phone }}</span>
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-icon class="mr-4" small>mdi-email-outline</v-icon>
                  <span class="body-2">{{ review.cv.author.user.email }}</span>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
        <v-row align="start" class="py-2">
          <v-col cols="1" class="py-0">
            <v-icon small>mdi-briefcase-variant</v-icon>
          </v-col>
          <v-col cols="5" class="body-2 py-0">
            {{ review.cv.exp }}
          </v-col>
          <v-col cols="1" class="py-0">
            <v-icon small>mdi-sort-descending</v-icon>
          </v-col>
          <v-col cols="5" class="body-2 py-0">
            {{ review.cv.position }}
          </v-col>
          <v-col cols="1" class="py-0">
            <v-icon small>mdi-briefcase-account</v-icon>
          </v-col>
          <v-col cols="5" class="body-2 py-0">
            <span v-for="(fi, i) in review.cv.fields" :key="i">{{ fi }}</span>
          </v-col>
          <v-col cols="1" class="py-0">
            <v-icon small>mdi-map-marker</v-icon>
          </v-col>
          <v-col cols="5" class="body-2 py-0">
            {{ review.cv.location }}
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="12" class="pb-0 text-uppercase">
            <h4>
              <v-icon color="amber" class="mr-2">mdi-star</v-icon> Kết quả đánh
              giá
            </h4>
          </v-col>
          <v-col cols="12" class="py-0" v-if="review.rating">
            <p>
              {{ review.cv.author.user.fullName }} đã đánh giá
              <span class="red--text">
                {{ review.rating.content.toLowerCase() + " " }}
              </span>
              với kết quả review của bạn.
            </p>
          </v-col>
          <v-col cols="12" class="py-0" v-else>
            <p>
              Chưa có đánh giá
            </p>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row v-if="review.report">
          <v-col cols="12" class="text-uppercase">
            <h4><v-icon class="mr-2">mdi-alert</v-icon> Báo cáo</h4>
          </v-col>
          <v-col cols="12" class="py-0">
            <p class="mb-0">
              {{ review.cv.author.user.fullName }}
              đã
              <span class="red--text">báo cáo</span> kết quả review của bạn.
            </p>
            <p>
              Lý do:
              <span class="red--text">{{ review.report.content }} </span>
            </p>
          </v-col>
        </v-row>
        <v-divider v-if="review.report"></v-divider>
        <v-row class="pt-2" @click.stop="dialog2 = true">
          <v-btn text>
            <v-icon class="mr-4" left>mdi-message-text</v-icon>
            <h3 class="font-weight-bold">Bắt đầu trò chuyện</h3>
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog2" max-width="450">
      <v-card class="elevation-4">
        <v-toolbar>
          <v-toolbar-title>Trò chuyện</v-toolbar-title>
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
        <v-card-text style="height: 50vh">
          <v-list
            ref="chat"
            id="listMessage"
            v-if="listMessage && listMessage.length"
          >
            <template v-for="msg in listMessage">
              <!-- <v-subheader v-if="item" :key="index">{{ item }}</v-subheader> -->
              <div
                v-if="msg"
                :key="msg._id"
                :class="{ 'd-flex flex-row-reverse': isMe(msg) }"
              >
                <v-menu offset-y>
                  <template v-slot:activator="{ on }">
                    <v-chip
                      :color="isMe(msg) ? 'primary' : 'grey'"
                      dark
                      style="height:auto;weight:220px;white-space: normal;"
                      class="pa-2 mb-2"
                      v-on="on"
                    >
                      {{ msg.content }}
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
            hide-details
            v-model="msg"
            append-outer-icon="mdi-send"
            @keyup.enter="sendMessage"
            @click:append-outer="sendMessage"
          >
          </v-text-field>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-sheet>
</template>
<script>
/* eslint-disable no-unused-vars */
import reviewService from "../../api/review";
import specialistService from "../../api/specialist";
import authService from "../../api/authentication";
import messageService from "../../api/message";
import { messageServiceRoot } from "../../api/message";

export default {
  data() {
    return {
      status: false,
      dialog2: false,
      currentUser: null,
      fileReview: null,
      listMessage: null,
      msg: "",
      review: null
    };
  },
  watch: {
    listMessage() {
      if (this.$refs.chat) {
        setTimeout(() => {
          this.$refs.chat.$el.scrollTop = this.$refs.chat.$el.scrollHeight;
        }, 500);
      }
    }
  },
  computed: {
    isPublic() {
      return this.cv && this.currentUser
        ? this.cv.listViewer.includes(this.currentUser.userId)
        : false;
    },
    cv() {
      return this.review.cv;
    }
  },
  methods: {
    async sendMessage() {
      const data = {
        content: this.msg,
        roomId: this.review.roomId
      };
      try {
        const message = await messageService.sendMessage(data);
        this.msg = "";
      } catch (err) {
        this.$swal({
          icon: "error",
          title: "Gửi tin nhắn thất bại",
          text: err
        });
      }
    },
    async getData() {
      const reviewId = this.$route.params.reviewId;
      this.review = await reviewService.getReview(reviewId);
      const userId = await authService.getCurrentUserId();
      const specialist = await specialistService.getSpecialist(userId);
      this.currentUser = specialist;
      // this.status = specialist.listReceivedCv.includes(cvId);
      let file = null;
      if (this.isPublic) {
        file = await (
          await fetch(`http://localhost:3030/cv/${this.cv.link}`)
        ).blob();
      } else {
        file = await (
          await fetch(`http://localhost:3030/cv/${this.cv.linkHidden}`)
        ).blob();
      }
      this.fileReview = URL.createObjectURL(file).toString() + "#toolbar=0";
      this.listMessage = await messageService.findMessageByRoomId(
        this.review.roomId
      );
    },
    isMe(msg) {
      return this.currentUser.user._id === msg.userId ? true : false;
    }
  },
  created() {
    this.getData();
    messageServiceRoot.on("created", message => {
      this.listMessage.push(message);
    });
  }
};
</script>
<style lang="scss" scoped>
#listMessage {
  height: 400px;
  overflow: auto;
}
.v-chip {
  max-width: 70%;
}
</style>
