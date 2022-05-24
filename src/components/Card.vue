<template>
  <DraggableItem class="cardlist-card vlayer shadow" dragId = "cards"
       ref="card">
    <slot></slot>
  </DraggableItem>
</template>

<script lang="ts" setup>
import {Ref, ref} from "vue";
import DraggableItem from "./DraggableItem.vue";

const card = <Ref<HTMLDivElement>><any>ref(null)

</script>

<style lang="scss">
@use "../assets/vars";

.cardlist-card {
  width: 100%;
  min-height: 48px;
  max-height: 48px;
  border-radius: 6px;
  cursor: pointer;
}

.cardlist-card[dragging] {
  display: none;
}

.cardlist-card[clone] {
  opacity: 20%;
  outline: 2px solid vars.$accent;

}
</style>