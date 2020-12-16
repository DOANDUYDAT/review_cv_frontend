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
    <v-card :width="320">
      <v-list>
        <v-list-item>
          <v-list-item-title class="title">
            Thông báo
          </v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <!-- <v-list-item-group color="primary"> -->
        <v-list-item v-for="(item, i) in items" :key="i" link>
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" link></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- </v-list-item-group> -->
      </v-list>

      <!-- <v-navigation-drawer permanent>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">
              Thông báo
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense nav>
          <v-list-item v-for="item in items" :key="item.title" link>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer> -->

      <!-- <v-container>
        <span>ABC</span>
      </v-container> -->

      <!-- v-if="notifications.length"
        <v-container>
        <v-row v-for="notification in notifications" :key="notification.id">
          <v-col cols="3">
            <v-img :height="60" contain :src="notification.image"></v-img>
          </v-col>
          <v-col cols="5">
            {{ notification.name }}
            <br />
            <b>
              x
              {{ notification.quantity }}
            </b>
          </v-col>
          <v-col cols="4">{{ formatCurrency(notification.price) }}đ</v-col>
        </v-row>
        <v-row>
          <v-col cols="6"></v-col>
          <v-col cols="6">
            Tổng tiền:
            <span style="color: red">{{ formatCurrency(total) }}đ</span>
          </v-col>
        </v-row>

        <v-card-actions>
          <v-row class="px-8" justify="space-between">
            <v-btn
              color="gg-red"
              class="ma-2"
              outlined
              :disabled="!notifications.length"
              @click="cartdetail"
            >Xem chi tiết</v-btn>
            <v-btn
              color="gg-red"
              tile
              dark
              class="ma-2"
              :disabled="!notifications.length"
              @click="goToOrderPage"
            >Đặt hàng ngay</v-btn>
          </v-row>
        </v-card-actions>
        <p v-show="checkoutStatus">Checkout {{ checkoutStatus }}.</p>
      </v-container> -->
    </v-card>

    <!-- <v-card v-else>
      <h3>Bạn không có thông báo nào</h3>
    </v-card> -->
  </v-menu>
</template>
<script>
// import { mapGetters, mapState } from "vuex";
// import _ from "lodash";
export default {
  data() {
    return {
      items: [
        { title: "Dashboard", icon: "mdi-view-dashboard" },
        { title: "Photos", icon: "mdi-image" },
        { title: "About", icon: "mdi-help-box" }
      ],
      dialog: false
    };
  },
  computed: {
    // ...mapState({
    //   checkoutStatus: state => state.cart.checkoutStatus
    // }),
    // ...mapGetters("cart", {
    //   notifications: "cartNotifications",
    //   total: "cartTotalPrice"
    // }),
    // numberNotification: function() {
    //   let numberNotification = 0;
    //   if (this.notifications.length) {
    //     this.notifications.forEach(notification => {
    //       numberNotification += notification.quantity;
    //     });
    //   }
    //   return numberNotification;
    // }
  },
  methods: {
    // goToOrderPage() {
    //   const path = this.$route.path;
    //   this.dialog = false;
    //   if (path !== "/order-page") {
    //     this.$router.push({ name: "order page" });
    //   }
    // },
    // cartdetail() {
    //   const path = this.$route.path;
    //   this.dialog = false;
    //   if (path !== "/shopping-cart") {
    //     this.$router.push({ name: "shopping cart" });
    //   }
    // },
    onMouseOver() {
      this.dialog = true;
    },
    onMouseOut() {
      this.dialog = false;
    }
  }
};
</script>

<style scoped></style>
