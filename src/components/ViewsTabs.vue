<template>
  <ul id="views-nav">
    <li><TabButton url="/dashboard/board">Board</TabButton></li>
    <li><TabButton url="/dashboard/calendar">Calendar</TabButton></li>


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
    background: transparent;
  }

}
</style>