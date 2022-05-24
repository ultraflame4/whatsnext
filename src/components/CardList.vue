<template>
  <div class="cardlist vlayer shadow" ref="root">
    <h1 class="cardlist-title">{{ props.title }}</h1>
    <slot></slot>

  </div>
</template>

<script lang="ts" setup>
import {ref, Ref} from "vue";

interface CardProps {
  title: string,
  listId?: string
}

// function allowDrop(ev: DragEvent) {
//   // check if card
//   const draggedElement = document.querySelector<HTMLDivElement>(".cardlist-card[dragging]")
//   if (draggedElement===null){
//     return
//   }
//   ev.preventDefault()
//   if (ev.dataTransfer) {
//     // const data = ev.dataTransfer.getData("card-data")
//   }
//
//   getElementAtYPos(ev.clientY)?.insertAdjacentElement("beforebegin",draggedElement)
//   removeClones()
//
// }
//
// const root = <Ref<HTMLDivElement>><any>ref(null)
//
// function getElementAtYPos(ypos: number): HTMLDivElement | null {
//   const children = root.value.querySelectorAll<HTMLDivElement>(".cardlist-card")
//   for (let i = 0; i < children.length; i++) {
//     let child = children[i]
//     const box = child.getBoundingClientRect()
//     if ((box.y + (box.height / 2)) > ypos) {
//       return child
//     }
//   }
//   return null
// }
//
//
// function onDragEnter(ev: DragEvent,draggedElement:HTMLDivElement) {
//
//   let previewClone = <HTMLDivElement>(<Element>draggedElement).cloneNode(true)
//   previewClone.removeAttribute("dragging")
//   previewClone.setAttribute("previewclone", "")
//   root.value.appendChild(previewClone)
// }
//
// let entered = false
//
// function removeClones(){
//   entered=false
//
//   root.value.querySelectorAll("[previewclone]").forEach(value => {
//
//     value.remove()
//   })
// }
//
// function onDragLeave(ev: DragEvent) {
//   // check if still mouse within element
//   let box = root.value.getBoundingClientRect()
//   let x = ev.clientX
//   let y = ev.clientY
//   if (!(box.left < x && box.right > x && box.top < y && box.bottom > y)) {
//     entered = false
//
//     removeClones()
//   }
// }
//
// function onDragOver(ev: DragEvent) {
//   ev.preventDefault()
//   // const over = getElementAtYPos(ev.pageY)
//   // check if the dragged element is a card. else ignore
//   const draggedElement = document.querySelector<HTMLDivElement>(".cardlist-card[dragging]")
//   if (draggedElement===null){
//     return
//   }
//
//   if (!entered) {
//     entered = true
//     onDragEnter(ev,draggedElement)
//   }
//
//   let previewCLone = root.value.querySelector<HTMLDivElement>("[previewclone]")
//   let c = getElementAtYPos(ev.clientY)
//   if (previewCLone&&c){
//     c.insertAdjacentElement("beforebegin", previewCLone)
//   }
//
// }

const props = defineProps<CardProps>()
</script>

<style lang="scss">
.cardlist {
  display: grid;
  grid-template-rows: 24px;
  grid-auto-rows: fit-content(64px);
  height: fit-content;
  max-height: 650px;

  width: 256px;
  border-radius: 8px;
  padding: 8px;
  gap: 8px;
  box-sizing: border-box;
  cursor: pointer;


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