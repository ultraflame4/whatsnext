<template>
  <nav id="navbar">
    <ViewsTabs/>
  </nav>

</template>

<script lang="ts" setup>

import ViewsTabs from "../components/ViewsTabs.vue";
</script>

<style lang="scss">
#navbar{
  height: 50px;
  position: relative;

  ul {
    background: none;
    display: flex;
    margin: 0;
    gap: 24px;
    height: 100%;
    list-style: none;
    padding: 0 24px;
    align-items: center;

    li {
      list-style: none;
      background: none;
    }
  }
}
</style>