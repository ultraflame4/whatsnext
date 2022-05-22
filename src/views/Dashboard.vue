<template>


  <div id="dashboard-grid-ctn">
    <nav id="navbar" class="vlayer">
      <ViewsTabs/>
    </nav>
    <div id="sidebar" class="vlayer">
      <h1>WhatsNext</h1>
      <div>

      </div>
      <div class="sidebar-section">
        <h1>
          Boards
        </h1>
        <SectionCheckbox>test</SectionCheckbox>
      </div>

    </div>
    <div id="content">
      <router-view></router-view>
    </div>
  </div>

</template>

<script lang="ts" setup>

import ViewsTabs from "../components/ViewsTabs.vue";
import SectionCheckbox from "../components/SectionCheckbox.vue";
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

  display: grid;
  border-right: 2px solid vars.$lines;
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 3;
  padding: 0 16px;
  padding-bottom: 16px;
  min-height: 0;
  grid-template-rows: 48px 128px repeat(2,minmax(32px,calc(calc(100%) / 2))) ;

  &>*{
    margin: 0;
    overflow: clip;
  }

  &>h1 {
    font-size: 16px;
    text-align: center;
    margin: 0;
    font-weight: 800;
    letter-spacing: 3px;

    color: vars.$bg-txt;
    justify-self: start;
    align-self: center;
  }

  &>.sidebar-section{
    &>h1{
      font-size: 14px;
      text-align: start;
      margin: 8px 4px;
      letter-spacing: 1px;
      font-weight: 700;
    }

  }

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