<template>


  <div id="dashboard-grid-ctn">
    <nav id="navbar" class="vlayer">
      <ViewsTabs/>
    </nav>
    <div id="sidebar" class="vlayer">
      dwa
    </div>
    <div id="content">
      <router-view></router-view>
    </div>
  </div>

</template>

<script lang="ts" setup>

import ViewsTabs from "../components/ViewsTabs.vue";
</script>

<style lang="scss">
@use "../assets/vars";
#dashboard-grid-ctn {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 48px auto;

  grid-template-columns: 256px auto;
}

#sidebar{

  border-right: 2px solid vars.$lines;

  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 3;

}

#navbar{

  padding-top: 16px;
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 2;
  border-bottom: 2px solid vars.$lines;

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
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 2;
  grid-row-end: 3;
  background: none;
}
</style>