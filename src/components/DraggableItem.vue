<template>
  <div draggable="true" @dragstart="startDrag($event)" @dragend="endDrag()" ref="draggableitem" data-isdg="false">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, Ref, ref} from "vue";

interface itemProps {
  dragId: string
}

const props = defineProps<itemProps>()

const draggableitem = <Ref<HTMLDivElement>><any>ref(null)

function isDraggable() {
  return (draggableitem.value.getAttribute("data-isdg")==="true"?true:false)
}
onMounted(() => {
  draggableitem.value.setAttribute(`draggable-item`, props.dragId)
  draggableitem.value.addEventListener('mousemove', ev => {
    if (!draggableitem.value.matches(":hover")){
      return
    }

    const childDraggable = draggableitem.value.querySelector('[data-isdg="true"]')
    if (childDraggable === null) {
      draggableitem.value.setAttribute("data-isdg","true")
    } else {
      draggableitem.value.setAttribute("data-isdg","false")
    }
  })
  draggableitem.value.addEventListener('mouseleave', ev => {
    draggableitem.value.setAttribute("data-isdg","false")
  })
})

function startDrag(ev: DragEvent) {
  if (!isDraggable()) {
    ev.target
    if (ev.target===draggableitem.value){
      ev.preventDefault()
    }
    return
  }

  if (ev.dataTransfer) {
    ev.dataTransfer.dropEffect = "move"
    ev.dataTransfer.effectAllowed = "all"
    // ev.dataTransfer.setData("card-data",card.value.outerHTML)
  }
  setTimeout(() => {
    draggableitem.value.setAttribute("dragging", "")
  }, 0)

}

function endDrag() {

  draggableitem.value.removeAttribute("dragging")
}
</script>

<style lang="scss">

</style>