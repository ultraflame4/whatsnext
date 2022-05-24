<template>
  <div @drop="allowDrop($event)" @dragover="onDragOver($event)"
       @dragenter.prevent @dragleave="onDragLeave($event)" ref="root">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>

import {onMounted, PropType, ref, Ref} from "vue";


const props = defineProps({
  dragId:{
    type: String,
    required:true
  },
  axis:{
    type: String as PropType<"x" | "y">,
    default: "y",
  }
})

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

  getElementAtPos((props.axis==="x"?ev.clientX:ev.clientY))?.insertAdjacentElement("beforebegin",draggedElement)

  removeClones()

}

function getElementAtPos(pos: number): HTMLDivElement | null {
  const children = root.value.querySelectorAll<HTMLDivElement>(`[draggable-item="${props.dragId}"]`)
  for (let i = 0; i < children.length; i++) {
    let child = children[i]
    const box = child.getBoundingClientRect()
    const boxpos = (props.axis==="x"?box.x:box.y)
    const boxlength = (props.axis==="x"?box.width:box.height)

    if ((boxpos + (boxlength / 2)) > pos) {
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
  let c = getElementAtPos(props.axis==="x"?ev.clientX:ev.clientY)
  if (clone&&c){
    c.insertAdjacentElement("beforebegin", clone)
  }

}

</script>

<style lang="scss">

</style>