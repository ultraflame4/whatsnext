<template>
  <button >
    <slot>

    </slot>
  </button>
</template>

<script lang="ts" setup>
defineProps({
  url:{
    type:String,
    default:"."
  }
})
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

    border: 0 solid vars.$accent;
    animation-name: widthshrink;
    animation-duration: 300ms;
    border-bottom-width: 2px;
    width: 0;
  }

  &:hover::after {
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