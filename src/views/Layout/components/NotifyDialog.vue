<template>
  <v-menu open-on-hover bottom offset-y>
    <template v-slot:activator="{ on }">
      <v-btn icon exact v-on="on">
        <v-badge overlap color="red">
          <template v-slot:badge>
            <!-- <span v-if="numberNotification > 0">{{ numberNotification }}</span> -->
            <span>10</span>
          </template>
          <v-icon color="white">mdi-bell</v-icon>
        </v-badge>
      </v-btn>
    </template>
    <v-card :width="340">
      <v-card-title class="py-1">Thông báo</v-card-title>
      <v-divider></v-divider>
      <v-list three-line style="overflow: auto; height:50vh">
        <!-- <v-list-item>
          <v-list-item-title class="title">
            Thông báo
          </v-list-item-title>
        </v-list-item> -->

        <!-- <v-list-item-group color="primary"> -->
        <!-- <v-list-item v-for="(item, i) in items" :key="i" link>
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" link></v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->
        <!-- </v-list-item-group> -->
        <v-list-item-group>
          <v-list-item link>
            <v-list-item-avatar>
              <v-icon color="red" large>mdi-heart</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-subtitle class="subtitle-1 black--text"
                >Chuyên gia Đạt Đần - công ty Viettel đã quan tâm đến CV của
                bạn.</v-list-item-subtitle
              >

              <v-list-item-subtitle class="primary--text"
                >Ngày 26/12/2020</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item link>
            <v-list-item-avatar>
              <v-icon color="primary" large>mdi-file-plus</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-subtitle class="subtitle-1 black--text"
                >Đạt Đần đã tải lên một CV mới.</v-list-item-subtitle
              >
              <v-list-item-subtitle class="primary--text"
                >Ngày 26/12/2020</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item link>
            <v-list-item-avatar>
              <v-icon color="orange" large>mdi-file-document-edit</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-subtitle class="subtitle-1 black--text"
                >Chuyên gia Đạt Đần đã review CV của bạn.</v-list-item-subtitle
              >
              <v-list-item-subtitle class="primary--text"
                >Ngày 26/12/2020</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item link>
            <v-list-item-avatar>
              <v-icon color="orange" large>mdi-file-document-edit</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-subtitle class="subtitle-1 black--text"
                >Cộng tác viên Đạt Đần đã review CV của
                bạn.</v-list-item-subtitle
              >
              <v-list-item-subtitle class="primary--text"
                >Ngày 26/12/2020</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item link>
            <v-list-item-avatar>
              <v-icon color="teal" large>mdi-account-check</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-subtitle class="subtitle-1 black--text"
                >Đạt Đần đã public thông tin liên hệ.</v-list-item-subtitle
              >
              <v-list-item-subtitle class="primary--text"
                >Ngày 26/12/2020</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
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
export default {
  data() {
    return {
      listNotification: null,
      dialog: false,
      currentUser: null
    };
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
      this.listNotification = await notifyService.getListNotifciationByToUserId(
        user._id
      );
    }
  },
  created() {
    notificationServiceRoot.on("created", notify => {
      // if (notify.from && notify.fromUser) {
      //   if (notify.fromUser.role === 'member') {
      //     this.listNotification.push({
      //       ...notify
      //     })
      //   }
      // }
      console.log(notify);
    });
  }
};
</script>

<style scoped></style>
