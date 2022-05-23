<template>


  <div id="dashboard-grid-ctn">
    <nav id="navbar" class="vlayer">
      <ViewsTabs/>
    </nav>
    <div id="sidebar" class="vlayer">
      <h1>WhatsNext</h1>
      <div>

      </div>
      <h2 style="grid-row-start: 3">
        Boards
      </h2>
      <div class="sidebar-section">

        <SectionCheckbox v-for="(i,index) in trelloBoards" name="board" :radio="true" :fullbar="true"
                         :checked="index===0?'true':'false'">{{ i.name }}
        </SectionCheckbox>
        <SectionCheckbox v-if="loginBypassed" v-for="index in 11" :radio="true" :fullbar="true" name="board"
                         :checked="index===0?'true':'false'">test {{index}}
        </SectionCheckbox>

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
import {computed, onMounted, ref} from "vue";
import {TrelloApi} from "../apis/trello";
import {Bypass} from "../apis/others";


const trelloBoards = ref<Trello.BoardObject[]>([]);
const loginBypassed = ref(Bypass)

onMounted(() => {
  TrelloApi.Board.getAllOpen().then(boards => {
    trelloBoards.value = boards;
  })
})

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

#sidebar {

  display: grid;
  border-right: 2px solid vars.$lines;
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 3;
  padding: 0 16px;
  padding-bottom: 16px;
  min-height: 0;
  grid-template-rows: 48px 128px 24px repeat(2, fit-content(calc(calc(100% - 202px) / 2)));

  & > * {
    margin: 0;
    overflow: clip;
  }

  & > h1 {
    font-size: 12px;
    text-align: center;
    margin: 0;
    font-weight: 700;
    letter-spacing: 3px;

    color: vars.$bg-txt;
    justify-self: start;
    align-self: center;
  }

  & > h2 {
    font-size: 12px;
    text-align: start;
    width: fit-content;
    margin: auto 4px;
    min-height: 0;
    height: fit-content;
    letter-spacing: 2px;
    font-weight: 700;
  }

  & > .sidebar-section {
    min-height: 32px;
    max-height: 100%;
    height: fit-content;
    overflow-y: auto;
    padding-right: 8px;
  }

}

#navbar {

  padding-top: 16px;
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 2;
  border-bottom: 2px solid vars.$lines;

  & > ul {
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

#content {
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 2;
  grid-row-end: 3;
  background: none;
}
</style>