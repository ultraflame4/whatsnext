<template>
  <div class="cardlist vlayer shadow" @drop="allowDrop($event)" @dragover="onDragOver($event)"
       @dragenter.prevent @dragleave="onDragLeave($event)" ref="root">
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

function allowDrop(ev: DragEvent) {
  ev.preventDefault()
  if (ev.dataTransfer) {
    // const data = ev.dataTransfer.getData("card-data")
  }
  const draggedElement = <HTMLDivElement>document.querySelector<HTMLDivElement>("[dragging]")
  getElementAtYPos(ev.clientY)?.insertAdjacentElement("beforebegin",draggedElement)
  removeClones()

}

const root = <Ref<HTMLDivElement>><any>ref(null)

function getElementAtYPos(ypos: number): HTMLDivElement | null {
  const children = root.value.querySelectorAll<HTMLDivElement>(".cardlist-card")
  for (let i = 0; i < children.length; i++) {
    let child = children[i]
    const box = child.getBoundingClientRect()
    if ((box.y + (box.height / 2)) > ypos) {
      return child
    }
  }
  return null
}


function onDragEnter(ev: DragEvent) {


  const draggedElement = document.querySelector<HTMLDivElement>("[dragging]")

  let clone = <HTMLDivElement>(<Element>draggedElement).cloneNode(true)
  clone.removeAttribute("dragging")
  clone.setAttribute("clone", "")
  root.value.appendChild(clone)
}

let entered = false

function removeClones(){
  entered=false

  root.value.querySelectorAll("[clone]").forEach(value => {

    value.remove()
  })
}

function onDragLeave(ev: DragEvent) {
  // check if still mouse within element
  let box = root.value.getBoundingClientRect()
  let x = ev.clientX
  let y = ev.clientY
  if (!(box.left < x && box.right > x && box.top < y && box.bottom > y)) {
    entered = false

    removeClones()
  }
}

function onDragOver(ev: DragEvent) {
  ev.preventDefault()
  // const over = getElementAtYPos(ev.pageY)
  if (!entered) {
    entered = true
    onDragEnter(ev)
  }

  let clone = root.value.querySelector<HTMLDivElement>("[clone]")
  let c = getElementAtYPos(ev.clientY)
  if (clone&&c){
    c.insertAdjacentElement("beforebegin", clone)
  }

}

const props = defineProps<CardProps>()
</script>

<style lang="scss">
.cardlist {
  display: grid;
  grid-template-rows: 24px fit-content(64px);
  height: fit-content;
  width: 256px;
  border-radius: 8px;
  padding: 8px;
  gap: 8px;
  box-sizing: border-box;

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