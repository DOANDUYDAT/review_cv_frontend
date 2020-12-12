<template>
  <v-card flat tile class="px-4">
    <v-card-title class="pt-1 pb-0">{{ answer.name }}</v-card-title>
    <v-card-text class="pb-0">
      <div style="text-align: justify;" class="mt-2">
        {{ answer.content }}
      </div>
      <div class="my-2 caption black--text">
        {{ formatCreatedAt(answer.createdAt) }}
      </div>
    </v-card-text>
    <v-card-actions class="py-0">
      <v-btn text @click="show = !show">Trả lời</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      show: false
    };
  },
  components: {},
  props: {
    answer: {}
  },
  methods: {
    formatCreatedAt(date) {
      const d = new Date();
      return (
        d.getFullYear(date) +
        "-" +
        Number(d.getMonth(date) + 1) +
        "-" +
        d.getDate(date)
      );
    }
  }
};
</script>
