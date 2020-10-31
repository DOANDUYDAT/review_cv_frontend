<template>
<div class="learning">
    <div class="learning__title">
        <v-icon>mdi-heart</v-icon>
        SỞ THÍCH
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
    name: 'Hobby',
    data () {
        return {
            items_need: [
                {
                    icon: 'mdi-menu-right',
                    text: 'Liệt kê một số sở thích cá nhân để giúp nhà tuyển dụng hiểu hơn về con người bạn.',
                },
            ],
        }
    }
}
</script>
<style lang="scss">

</style>