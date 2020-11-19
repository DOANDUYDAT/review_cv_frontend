<template>
  <div class="personal">
    <div class="personal__title">
      <v-icon>mdi-information</v-icon>
      THONG TIN CA NHAN
    </div>
    <v-divider></v-divider>
    <div class="personal__info">
      <v-list rounded>
        <v-subheader>REPORTS</v-subheader>
        <v-list-item-group color="primary">
          <v-list-item v-for="(item, i) in items" :key="i">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">
                OVERLINE
              </div>
              <v-list-item-title class="headline mb-1">
                Nên:
              </v-list-item-title>
              <v-list-item-subtitle v-text="should"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">
                OVERLINE
              </div>
              <v-list-item-title class="headline mb-1">
                Không nên:
              </v-list-item-title>
              <v-list-item-subtitle v-text="shouldnt"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <p>{{ description }}</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          icon: "mdi-menu-right",
          text: "Viết đầy đủ họ tên của bạn."
        },
        {
          icon: "mdi-menu-right",
          text: "Email cần nghiêm túc nên chứa họ tên bạn."
        },
        {
          icon: "mdi-menu-right",
          text: "Chèn ảnh đại diện:"
        }
      ],
      should:
        "chèn ảnh phù hợp với vị trí ứng tuyển,nhìn thấy khuôn mặt trực diện.",
      shouldnt:
        "ảnh chỉ nhìn thấy một phần khuôn mặt hoặc quay lưng về phía trước.",
      description:
        "Nếu bạn ứng tuyển cho một số công ty trong nước hoặc các công ty không phải là công ty nước ngoài liên quan đến các nước như Mỹ, Anh bạn cỏ thể thêm một số thông tin cá nhân khác: Ngày sinh, giới tính, tình trạng hôn nhân."
    };
  }
};
</script>
<style lang="scss"></style>
