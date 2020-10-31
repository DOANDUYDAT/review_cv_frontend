<template>
<div class="learning">
    <div class="learning__title">
        <v-icon>mdi-trophy</v-icon>
        GIẢI THƯỞNG
    </div>
    <v-divider></v-divider>
    <div class="learning__info">
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
    </div>
</div>
</template>
<script>
export default {
    name: 'Rewards',
    data () {
        return {
            items_need: [
                {
                    icon: 'mdi-menu-right',
                    text: 'Các giải thưởng đạt được trong quá trình học tập, công tác.',
                },
                {
                    icon: 'mdi-menu-right',
                    text: 'Ví dụ: Học bổng, Danh hiệu Nhân viên xuất sắc năm,...',
                },
            ],
        }
    }
}
</script>
<style lang="scss">

</style>