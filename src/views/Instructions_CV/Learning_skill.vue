<template>
<div class="learning">
    <div class="learning__title">
        <v-icon>mdi-layers</v-icon>
        HOC VAN
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
    </div>
</div>
</template>
<script>
export default {
    name: 'Learning',
    data () {
        return {
            items_need: [
                {
                    icon: 'mdi-menu-right',
                    text: 'Ngành học, trường học.',
                },
                {
                    icon: 'mdi-menu-right',
                    text: 'Một số môn chuyên ngành có tính ứng dụng cao ở công việc mà bạn đạt kết quả tốt thì bạn có thể đề cập đến.',
                },
                {
                    icon: 'mdi-menu-right',
                    text: 'Đề án, nghiên cứu khoa học nếu có…(có liên quan đến vị trí ứng tuyển).'
                },
                {
                    icon: 'mdi-menu-right',
                    text: 'Đưa vào thành tích giải thưởng như học bổng, chứng chỉ (có thể đề cập ở mục giải thưởng, chứng chỉ).'
                }
            ],
            items_neednt: [
                {
                    icon: 'mdi-menu-right',
                    text: 'Đưa quá trình học tập từ cấp 1, cấp 2.',
                },
            ],
        }
    }
}
</script>
<style lang="scss">

</style>