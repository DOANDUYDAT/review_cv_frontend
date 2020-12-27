<template>
  <div class="showCV">
    <header>
      <div class="titleCV">
        Xem CV Online của <span>{{ nameUser }}</span>
      </div>
      <a href="#" btn btn-default>
        <i class="fa fa-download"></i>
        Tải CV PDF
      </a>
      <a href="#" class="btn btn-default">
        <i class="fa fa-copy"></i>
        Copy CV
      </a>
    </header>
    <main></main>
  </div>
</template>
<script>
export default {
  name: "ShowCV",
  data() {
    return {
      nameUser: "Le Dinh Duc"
    };
  },
  methods: {},
  components: {}
};
</script>
<style lang="scss" scoped>
.showCV {
  background: black;
}
.btn {
  text-decoration: none;
  color: white;
}
</style>
