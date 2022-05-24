<template>
<div class="cardlist-card vlayer shadow" draggable="true" @dragstart="startDrag($event)" @dragend="endDrag()" ref="card">
<slot></slot>
</div>
</template>

<script lang="ts" setup>
import {Ref, ref} from "vue";

const card = <Ref<HTMLDivElement>><any>ref(null)
function startDrag(ev:DragEvent) {
  // ev.preventDefault()
  if (ev.dataTransfer){
    ev.dataTransfer.dropEffect="move"
    ev.dataTransfer.effectAllowed="all"
    // ev.dataTransfer.setData("card-data",card.value.outerHTML)
  }
  setTimeout(()=>{card.value.setAttribute("dragging","")},0)

}

function endDrag() {
  card.value.removeAttribute("dragging")
}
</script>

<style lang="scss">
@use "../assets/vars";
.cardlist-card{
  width: 100%;
  min-height: 48px;
  max-height: 48px;
  border-radius: 6px;
  cursor: pointer;
}
.cardlist-card[dragging]{
  display: none;
}
.cardlist-card[clone]{
  opacity: 20%;
  outline: 2px solid vars.$accent;

}
</style>