<template>
  <DraggableItem dragId="boardlist" class="cardlist-ctn vlayer shadow">
    <h1 class="cardlist-title">{{ props.title }}</h1>
    <DraggableItemContainer dragId="cards" class="cardlist">
      <slot></slot>
    </DraggableItemContainer>
  </DraggableItem>
</template>

<script lang="ts" setup>
import {ref, Ref} from "vue";
import DraggableItemContainer from "./DraggableItemContainer.vue";
import DraggableItem from "./DraggableItem.vue";

interface CardProps {
  title: string,
  listId?: string
}

const props = defineProps<CardProps>()
</script>

<style lang="scss">
.cardlist-ctn{
  display: grid;
  grid-template-rows: 24px;
  grid-auto-rows: fit-content(min(600px,calc(100vh - 150px)));
  width: 256px;
  padding: 8px;
  border-radius: 8px;
  height: fit-content;
  box-sizing: border-box;

}
.cardlist {
  display: grid;
  grid-auto-rows: fit-content(64px);
  border-radius: 6px;
  overflow-y: auto;
  gap: 8px;
  padding: 0 4px;
  padding-top: 4px;
}

.cardlist-title {
  grid-row-start: 1;
  grid-row-end: 2;
  font-size: 14px;
  font-weight: 500;
  margin: auto 0;
  margin-left: 8px;

}
</style>