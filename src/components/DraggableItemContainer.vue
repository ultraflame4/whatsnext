<template>
  <div @drop="allowDrop($event)" @dragover="onDragOver($event)"
       @dragenter.prevent @dragleave="onDragLeave($event)" ref="root">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>

import {onMounted, ref, Ref} from "vue";

interface itemProps{
  dragId:string
}
const props = defineProps<itemProps>()

const root = <Ref<HTMLDivElement>><any>ref(null)

onMounted(() => {
  root.value.setAttribute("draggable-ctn",props.dragId)
})


function allowDrop(ev: DragEvent) {
  const draggedElement = <HTMLDivElement>document.querySelector<HTMLDivElement>("[dragging]")
  if (draggedElement.getAttribute("draggable-item")!==props.dragId){return}
  ev.preventDefault()
  if (ev.dataTransfer) {
    // const data = ev.dataTransfer.getData("card-data")
  }

  getElementAtYPos(ev.clientY)?.insertAdjacentElement("beforebegin",draggedElement)

  removeClones()

}

function getElementAtYPos(ypos: number): HTMLDivElement | null {
  const children = root.value.querySelectorAll<HTMLDivElement>(`[draggable-item="${props.dragId}"]`)
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
  if (draggedElement.getAttribute("draggable-item")!==props.dragId){return}

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
  const draggedElement = document.querySelector<HTMLDivElement>("[dragging]")
  if (draggedElement.getAttribute("draggable-item")!==props.dragId){return}
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
  const draggedElement = document.querySelector<HTMLDivElement>("[dragging]")
  if (draggedElement.getAttribute("draggable-item")!==props.dragId){return}
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

</script>

<style lang="scss">

</style>