<template>
  <button @click="gotoUrl()" ref="button">
    <slot>

    </slot>
  </button>
</template>

<script lang="ts" setup>
import {onMounted, onUpdated, Ref, ref, toRef} from "vue";
import {vRoute} from "../others";
import {useRouter} from "vue-router";

let router = useRouter()
const button = <Ref<HTMLButtonElement>>ref<any>(0)

const props = defineProps({
  url: {
    type: String,
    default: "."
  }
})

function gotoUrl() {
  vRoute(props.url)
}
let a = () => {
  if (router.currentRoute.value.path === props.url) {
    button.value.setAttribute("a","true")
  }
  else{
    button.value.setAttribute("a","false")
  }
}
router.afterEach(a)
onMounted(a)
</script>

<style scoped lang="scss">
@use "../assets/vars";

button {

  border: none;

  position: relative;
  cursor: pointer;

  top: 1px;

  &::after {
    position: relative;
    content: "";
    display: block;
    padding-top: 8px;
    border: 0 solid vars.$accent;
    animation-name: widthshrink;
    animation-duration: 300ms;
    border-bottom-width: 2px;
    width: 0;
  }

  &:hover::after, &[a=true]::after {
    animation-name: widthexpand;
    animation-duration: 300ms;
    width: 100%;

  }
}

@keyframes widthexpand {
  from {
    width: 0;

  }
  to {
    width: 100%;

  }
}

@keyframes widthshrink {
  from {
    left: 0;
    width: 100%;
  }
  to {
    left: 100%;
    width: 0;
  }

}

</style>