<template>
  <div class="cardlist-card vlayer shadow" ref="card" v-draggable-item>
    <p class="card-title">
      <slot></slot>

    </p>
  </div>
</template>

<script lang="ts" setup>
import {Ref, ref} from "vue";
import {Bypass} from "../apis/others";

const card = <Ref<HTMLDivElement>><any>ref(null)

function getBypass() {
  return Bypass
}

//
// function startDrag(ev:DragEvent) {
//   // ev.preventDefault()
//   if (ev.dataTransfer){
//     ev.dataTransfer.dropEffect="move"
//     ev.dataTransfer.effectAllowed="all"
//     // ev.dataTransfer.setData("card-data",card.value.outerHTML)
//   }
//   card.value.setAttribute("dragging-clone","")
//   card.value.setAttribute("dragging","false")
//   setTimeout(()=>{card.value.setAttribute("dragging","true")},0)
//
// }
//
// function endDrag() {
//   card.value.removeAttribute("dragging")
// }
</script>

<style lang="scss">
@use "../assets/vars";

.cardlist-card {
  width: 100%;
  min-height: 48px;
  max-height: 48px;
  border-radius: 6px;
  cursor: pointer;
  padding: 8px;
  box-sizing: border-box;
}

.card-title {
  margin: 0;
}

.cardlist-card[dragging="false"] {
  opacity: 0%;
}

.cardlist-card[dragging="true"] {
  display: none;
}

.cardlist-card[previewclone] {
  opacity: 20%;
  outline: 2px solid vars.$accent;

}
</style>