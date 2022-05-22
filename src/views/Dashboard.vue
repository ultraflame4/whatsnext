<template>
  <nav id="navbar" class="vlayer">
    <ViewsTabs/>
  </nav>
  <div id="content">
    <router-view></router-view>
  </div>


</template>

<script lang="ts" setup>

import ViewsTabs from "../components/ViewsTabs.vue";
</script>

<style lang="scss">
#navbar{
  padding-top: 16px;
  width: 100%;
  position: absolute;

  &>ul {
    display: flex;
    margin: 0;
    gap: 24px;
    height: 100%;
    list-style: none;
    padding: 0 24px;
    align-items: center;

    li {
      list-style: none;

    }
  }
}

#content{
  height: 100%;
  box-sizing: border-box;
  padding: 0 16px;
  padding-top: calc(50px + 16px);

  background: none;
}
</style>