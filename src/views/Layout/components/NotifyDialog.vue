<template>
  <v-menu bottom offset-y>
    <template v-slot:activator="{ on }">
      <v-btn icon exact v-on="on" @click="notifications = 0">
        <v-badge :content="notifications" :value="notifications" color="green">
          <v-icon color="white">mdi-bell</v-icon>
        </v-badge>
      </v-btn>
    </template>
    <v-card :width="340">
      <v-card-title class="py-1">Thông báo</v-card-title>
      <v-divider></v-divider>
      <v-list three-line style="overflow: auto; height:50vh">
        <v-list-item-group>
          <notify-item
            v-for="notify in listNotification"
            :key="notify._id"
            :data="notify"
            :icon="getIcon(notify)"
          >
            <template v-slot:content>
              {{ getContent(notify) }}
            </template>
          </notify-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </v-menu>
</template>
<script>
/* eslint-disable no-unused-vars */
// import notifyService from "../../../api/notification";
import notifyService from "@/api/notification";
import { notificationServiceRoot } from "@/api/notification";
import authService from "@/api/authentication";
import memberService from "@/api/member";
import specialistService from "@/api/specialist";
import volunteerService from "@/api/volunteer";
import NotifyItem from "./NotifyItem.vue";
import userService from "@/api/user";

export default {
  data() {
    return {
      listNotification: null,
      dialog: false,
      currentUser: null,
      // isNewStatus: false,
      notifications: 0
    };
  },
  components: {
    NotifyItem
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
      this.listNotification = await notifyService.getListNotifciationByListId(
        this.currentUser.user.listNotifications
      );
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
    getContent(notify) {
      if (notify.type === "interestCv") {
        return `Chuyên gia ${notify.fromUser.fullName} đã quan tâm Cv của bạn`;
      } else if (notify.type === "publicCv") {
        return `${notify.fromUser.fullName} đã public thông tin liên hệ`;
      } else if (notify.type === "newCv") {
        return `${notify.fromUser.fullName} vừa đăng 1 Cv mới`;
      } else if (notify.type === "newReview") {
        return `${notify.fromUser.fullName} đã review Cv của bạn`;
      }
    }
  },
  created() {
    this.getData();
    notificationServiceRoot.on("created", notify => {
      this.notifications++;
      this.listNotification.unshift(notify);
    });
  }
};
</script>

<style scoped></style>
