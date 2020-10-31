<template>
<div class="goal">
    <div class="goal__title">
        <v-icon>mdi-check</v-icon>
        MUC TIEU NGHE NGHIEP
    </div>
    <v-divider></v-divider>
    <div class="goal__info">
        <v-list rounded>
      <v-subheader>NÊN :</v-subheader>
      <v-list-item-group
        v-model="selectedItem"
        color="primary"
      >
        <v-list-item
          v-for="(item, i) in items_need"
          :key="i"
        >
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
      <v-list-item-group
        v-model="selectedItem"
        color="primary"
      >
        <v-list-item
          v-for="(item, i) in items_neednt"
          :key="i"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
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
    name: 'Goal',
    data () {
        return {
            items_need: [
                {
                    icon: 'mdi-menu-right',
                    text: 'Vị trí mong muốn ứng tuyển,có thể đề cập đến công ty ứng tuyển.',
                },
                {
                    icon: 'mdi-menu-right',
                    text: 'Thể hiện kỹ năng, kiến thức chuyên môn bạn có thể áp dụng vào vị trí công việc.',
                },
                {
                    icon: 'mdi-menu-right',
                    text: 'Có thể phân ra thành mục tiêu ngắn hạn như thành thạo công việc trong vòng…tháng và mục tiêu dài hạn như cơ hội thăng tiến đến một vị trí nào đó.'
                },
                {
                    icon: 'mdi-menu-right',
                    text: 'Mục tiêu hướng đến lợi ích công ty như tăng doanh số, đẩy mạnh brand, mở rộng tập khách hàng…'
                }
            ],
            items_neednt: [
                {
                    icon: 'mdi-menu-right',
                    text: 'Viết mục tiêu chung chung như làm việc trong một môi trường năng động, có thể học hỏi được nhiều… hoặc tìm kiếm vị trí phù hợp với bản thân để phát huy hết tất cả những kinh nghiệm, kĩ năng của bản thân…',
                },
            ],
        }
    }
}
</script>
<style lang="scss">

</style>