<template>
  <v-app>
    <v-app-bar
      color="#43a047"
      dark
      src="../../assets/profile.png"
      clipped-left
      app
    >
      <v-toolbar-title class="headline">Trang quản trị</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn text dark v-on="on">
            <v-icon left>mdi-account-circle</v-icon>
            Quản trị viên
            <v-icon right>mdi-menu-down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="LogOut">
            <v-list-item-title>Đăng xuất</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-navigation-drawer clipped app>
      <v-list>
        <template v-for="item in items">
          <v-list-group :key="item.text">
            <template v-slot:activator>
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </template>
            <v-list-item
              v-for="(child, i) in item.children"
              :key="i"
              :to="child.link"
            >
              <v-list-item-content class="mx-6">{{
                child.text
              }}</v-list-item-content>
            </v-list-item>
          </v-list-group>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container class="mx-auto" fluid>
        <alert-list></alert-list>
        <breadcrumb-base></breadcrumb-base>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import BreadcrumbBase from "../Admin/BreadcrumbBase";
import AlertList from "../Admin/AlertList";
import authService from "../../api/authentication";

export default {
  name: "Admin",
  data() {
    return {
      items: [
        {
          text: "Quản lý tài khoản thành viên",
          icon: "mdi-account",
          children: [
            {
              text: "Danh sách thành viên",
              link: "/Admin/Members"
            }
          ]
        },
        {
          text: "Quản lý tài khoản chuyên gia",
          icon: "mdi-account-star",
          children: [
            {
              text: "Danh sách chuyên gia",
              link: "/Admin/Specialists"
            },
            {
              text: "Danh sách đăng ký mới",
              link: "/Admin/New-specialists"
            }
          ]
        },
        {
          text: "Quản lý tài khoản cộng tác viên",
          icon: "mdi-account-multiple",
          children: [
            {
              text: "Danh sách cộng tác viên",
              link: "/Admin/Volunteers"
            },
            {
              text: "Danh sách đăng ký mới",
              link: "/Admin/New-volunteers"
            }
          ]
        },
        {
          text: "Quản lý quà tặng",
          icon: "mdi-gift",
          children: [
            {
              text: "Danh sách quà tặng",
              link: "/Admin/Gifts"
            },
            {
              text: "Thêm quà tặng",
              link: "/Admin/Add-Gift"
            }
          ]
        }
      ]
    };
  },
  methods: {
    LogOut() {
      authService.logout().finally(() => {
        this.$router.push({ name: "Home" });
        this.$swal({
          position: "center",
          icon: "success",
          title: "Đăng xuất thành công!",
          showConfirmButton: false,
          timer: 1500
        });
      });
    }
  },
  components: {
    BreadcrumbBase,
    AlertList
  }
};
</script>
