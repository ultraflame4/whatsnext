<template>
  <ul id="views-nav">
    <li><TabButton>Board</TabButton></li>
    <li><TabButton>Calendar</TabButton></li>

  </ul>
</template>

<script lang="ts" setup>


import TabButton from "./TabButton.vue";
</script>

<style lang="scss">
@use "../assets/vars";
#views-nav{
  & > li :first-child{
    font-size: 16px;
    letter-spacing: 2px;
    font-weight: bold;
  }

}
</style>