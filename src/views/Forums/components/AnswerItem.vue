<template>
  <v-container> </v-container>
</template>
<script>
export default {
  data() {
    return {
      answer: null
    };
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  }
};
</script>
