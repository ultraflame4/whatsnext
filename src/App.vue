<template>
<div id="app">
  <router-view></router-view>
</div>
</template>

<script setup lang="ts">

</script>

<style lang="scss">
@use "assets/vars";
#app{
  background: vars.$background;
  width: 100vw;
  height: 100vh;
}

</style>