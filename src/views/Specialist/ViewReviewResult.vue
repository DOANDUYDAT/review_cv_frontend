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
            {{ review.cv.field }}
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
        <v-card-text class="px-1" style="height: 50vh">
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
                <v-avatar class="mx-1" color="grey darken-1" size="20">
                  <v-img src="@/assets/avatar.jpg"></v-img>
                </v-avatar>
                <v-menu offset-y>
                  <template v-slot:activator="{ on }">
                    <span
                      class="caption mx-2
                    "
                      style="align-self: center"
                      >{{ shortTime(msg.createdAt) }}</span
                    >
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
          <!-- <v-text-field
            placeholder="Nhập vào đây để trò chuyện"
            outlined
            hide-details
            v-model="msg"
            append-outer-icon="mdi-send"
            @keyup.enter="sendMessage"
            @click:append-outer="sendMessage"
          >
          </v-text-field> -->
          <div class="emoji-wrapper">
            <textarea
              class="regular-input"
              v-model="msg"
              :style="{ width: emojiWidth, height: emojiHeight }"
            ></textarea>

            <emoji-picker @emoji="append" :search="search">
              <div
                class="emoji-invoker"
                slot="emoji-invoker"
                slot-scope="{ events: { click: clickEvent } }"
                @click.stop="clickEvent"
              >
                <svg
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path
                    d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"
                  />
                </svg>
              </div>
              <div slot="emoji-picker" slot-scope="{ emojis, insert }">
                <div
                  class="emoji-picker"
                  :style="{ top: emojiPickerHeight, left: emojiPickerWidth }"
                >
                  <!-- <div class="emoji-picker__search">
                    <input type="text" v-model="search" v-focus />
                  </div> -->
                  <div>
                    <div
                      v-for="(emojiGroup, category) in emojis"
                      :key="category"
                    >
                      <h5>{{ category }}</h5>
                      <div class="emojis">
                        <span
                          v-for="(emoji, emojiName) in emojiGroup"
                          :key="emojiName"
                          @click="insert(emoji)"
                          :title="emojiName"
                          >{{ emoji }}</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </emoji-picker>
          </div>
          <v-btn color="primary" icon @click="sendMessage"
            ><v-icon>mdi-send</v-icon></v-btn
          >
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
      review: null,
      input: "",
      search: "",
      emojiWidth: "24em",
      emojiHeight: "3em",
      emojiPickerHeight: "-15em",
      emojiPickerWidth: "9em"
    };
  },
  components: {
    // VEmojiPicker
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
    append(emoji) {
      this.msg += emoji;
    },
    shortTime: timeStamp => {
      let d = new Date(timeStamp);
      return d.toLocaleTimeString();
    },
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
      file = await (
        await fetch(`http://localhost:3030/review/${this.review.link}`)
      ).blob();
      this.fileReview = URL.createObjectURL(file).toString() + "#toolbar=0";
      this.listMessage = await messageService.findMessageByRoomId(
        this.review.roomId
      );
    },
    isMe(msg) {
      return this.currentUser.user._id === msg.userId ? true : false;
    }
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      }
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
  max-width: 65%;
}
/* Tailwind CSS-styled demo is available here: https://codepen.io/DCzajkowski/pen/Brxvzj */

.emoji-wrapper {
  position: relative;
  display: inline-block;
}

.regular-input {
  padding: 0.5rem 1rem;
  border-radius: 3px;
  border: 1px solid #ccc;
  outline: none;
}

.regular-input:focus {
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
}

.emoji-invoker {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;
}
.emoji-invoker:hover {
  transform: scale(1.1);
}
.emoji-invoker > svg {
  fill: #b1c6d0;
}

.emoji-picker {
  position: absolute;
  // z-index: 10;
  font-family: Montserrat;
  border: 1px solid #ccc;
  width: 15rem;
  height: 15rem;
  overflow: scroll;
  padding: 1rem;
  box-sizing: border-box;
  border-radius: 0.5rem;
  background: #fff;
  box-shadow: 1px 1px 8px #c7dbe6;
}
.emoji-picker__search {
  display: flex;
}
.emoji-picker__search > input {
  flex: 1;
  border-radius: 10rem;
  border: 1px solid #ccc;
  padding: 0.5rem 1rem;
  outline: none;
}
.emoji-picker h5 {
  margin-bottom: 0;
  color: #b1b1b1;
  text-transform: uppercase;
  font-size: 0.8rem;
  cursor: default;
}
.emoji-picker .emojis {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.emoji-picker .emojis:after {
  content: "";
  flex: auto;
}
.emoji-picker .emojis span {
  padding: 0.2rem;
  cursor: pointer;
  border-radius: 5px;
}
.emoji-picker .emojis span:hover {
  background: #ececec;
  cursor: pointer;
}
</style>
