<template>
  <div class="skill">
    <div class="skill__title">
      <v-icon>mdi-lightbulb</v-icon>
      KỸ NĂNG
    </div>
    <v-divider></v-divider>
    <div class="skill__info">
      <v-list rounded>
        <v-subheader>NÊN :</v-subheader>
        <v-list-item-group color="primary">
          <v-list-item v-for="(item, i) in items_need" :key="i">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-list rounded>
        <v-subheader>KHÔNG NÊN :</v-subheader>
        <v-list-item-group color="primary">
          <v-list-item v-for="(item, i) in items_neednt" :key="i">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </div>
  </div>
</template>
<script>
export default {
  name: "Learning",
  data() {
    return {
      items_need: [
        {
          icon: "mdi-menu-right",
          text:
            "Nêu ra các kỹ năng giúp ích cho vị trí ứng tuyển (tùy thuộc vào vị trí ứng tuyển và những kỹ năng bạn có để đưa vào CV những kỹ năng phù hợp)."
        },
        {
          icon: "mdi-menu-right",
          text:
            "Có thể đưa minh chứng ngắn gọn những kỹ năng đạt được qua công việc gì, hoạt động gì…"
        }
      ],
      items_neednt: [
        {
          icon: "mdi-menu-right",
          text: "Đưa định nghĩa, quan điểm cá nhân."
        }
      ]
    };
  }
};
</script>
<style lang="scss"></style>
