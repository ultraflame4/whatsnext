<template>
  <div draggable="true" @dragstart="startDrag($event)" @dragend="endDrag()" ref="draggableitem">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, Ref, ref} from "vue";

interface itemProps{
  dragId:string
}
const props = defineProps<itemProps>()

const draggableitem = <Ref<HTMLDivElement>><any>ref(null)

onMounted(() => {
  draggableitem.value.setAttribute(`draggable-item`,props.dragId)
})
function startDrag(ev:DragEvent) {
  // ev.preventDefault()
  if (ev.dataTransfer){
    ev.dataTransfer.dropEffect="move"
    ev.dataTransfer.effectAllowed="all"
    // ev.dataTransfer.setData("card-data",card.value.outerHTML)
  }
  setTimeout(()=>{draggableitem.value.setAttribute("dragging","")},0)

}

function endDrag() {
  draggableitem.value.removeAttribute("dragging")
}
</script>

<style lang="scss">

</style>