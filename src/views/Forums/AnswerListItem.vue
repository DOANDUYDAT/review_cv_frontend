<template>
  <div>
    <v-row>
      <v-col cols="2">
        <v-btn class="ma-2" outlined fab color="teal">
          <v-icon>mdi-check-bold</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="10"></v-col>
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
    </v-row>
    <v-row> </v-row>
  </div>
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
