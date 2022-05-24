<template>
<DraggableItemContainer class="board" dragId="boardlist" axis="x">
  <CardList v-if="isTest" v-for="x in 3" title="Test">
    <Card v-for="i in 10">
      card {{x}},{{i}}
    </Card>
  </CardList>
</DraggableItemContainer>
</template>

<script lang="ts" setup>

import {onBeforeRouteUpdate, useRouter} from "vue-router";
import CardList from "../components/CardList.vue";
import Card from "../components/Card.vue";
import {ref} from "vue";
import DraggableItemContainer from "../components/DraggableItemContainer.vue";

const router = useRouter()
const isTest = ref(true)
const boardId = ref("0")
onBeforeRouteUpdate(to => {
  isTest.value = to.query.istest!==undefined?true:false
  boardId.value = <string>to.query.id
})

</script>

<style scoped lang="scss">
.board{
  padding: 16px;
  background: none;
  display: flex;
  gap: 8px;
  color: white;
}
</style>