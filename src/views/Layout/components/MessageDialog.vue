<template>
  <v-menu bottom offset-y>
    <template v-slot:activator="{ on }">
      <v-btn icon exact v-on="on" @click="newMessages = 0">
        <v-badge :content="newMessages" :value="newMessages" color="green">
          <v-icon color="white">mdi-message-processing</v-icon>
        </v-badge>
      </v-btn>
    </template>
    <v-card :width="340">
      <v-card-title class="py-1">Tin nhắn mới</v-card-title>
      <v-divider></v-divider>
      <v-list three-line style="overflow: auto; height:50vh">
        <v-list-item-group>
          <message-item
            v-for="message in listMessage"
            :key="message._id"
            :data="message"
          >
            <template v-slot:content>
              {{ getContent(message) }}
            </template>
          </message-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </v-menu>
</template>
<script>
/* eslint-disable no-unused-vars */
// import notifyService from "../../../api/notification";
import notifyService from "@/api/notification";
import { messageServiceRoot } from "@/api/message";
import authService from "@/api/authentication";
import memberService from "@/api/member";
import specialistService from "@/api/specialist";
import volunteerService from "@/api/volunteer";
import MessageItem from "./MessageItem.vue";
import userService from "@/api/user";

export default {
  data() {
    return {
      listRoom: null,
      dialog: false,
      currentUser: null,
      // isNewStatus: false,
      newMessages: 0,
      listMessage: []
    };
  },
  components: {
    MessageItem
  },
  computed: {},
  methods: {
    onMouseOver() {
      this.dialog = true;
    },
    onMouseOut() {
      this.dialog = false;
    },
    async getData() {
      const user = await authService.getUserByRole();
      this.currentUser = user;
      this.listRoom = user.rooms;
    },
    getIcon(notify) {
      if (notify.type === "interestCv") {
        return {
          color: "red",
          text: "mdi-heart"
        };
      } else if (notify.type === "publicCv") {
        return {
          color: "success",
          text: "mdi-account-check"
        };
      } else if (notify.type === "newCv") {
        return {
          color: "warning",
          text: "mdi-file-plus"
        };
      } else if (notify.type === "newReview") {
        return {
          color: "primary",
          text: "mdi-file-document-edit"
        };
      }
    },
    getContent(message) {
      return `${message.user.fullName} đã nhắn tin cho bạn`;
    }
  },
  created() {
    this.getData();
    messageServiceRoot.on("created", newMessage => {
      if (this.currentUser.userId === newMessage.userId) {
        console.log("đã gửi tin nhắn", newMessage);
      } else {
        this.newMessages++;
        this.listMessage.unshift(newMessage);
      }
    });
  }
};
</script>

<style scoped></style>
