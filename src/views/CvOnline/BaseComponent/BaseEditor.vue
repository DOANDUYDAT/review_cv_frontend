<template>
  <div
    contenteditable
    :style="{
      fontSize: smallFont + 'px',
      marginTop: lineheight + 'px',
      fontFamily: fontfamily
    }"
    @input="update"
    v-html="valueText"
  ></div>
</template>
<script>
export default {
  props: ["value", "bigfont", "smallFont", "lineheight", "fontfamily"],
  data() {
    return {
      valueText: ""
    };
  },
  methods: {
    update(evt) {
      this.$emit("update:value", evt.target.innerHTML);
    }
  },
  created() {
    this.valueText = this.value;
  }
};
</script>
