<template>
  <div class="section-checkbox" :style="computedCssStyles" ref="root">
    <input type="checkbox"/>
    <p>
      <slot></slot>
    </p>
  </div>
</template>

<script lang="ts" setup>
import {computed, onMounted, Ref, ref} from "vue";

const root = <Ref<HTMLDivElement>><any>ref(null)
onMounted(() => {
  root.value.addEventListener("click", (e: Event) => {
    const input = root.value.querySelector("input") as HTMLInputElement;
    input.checked = !input.checked;
  });
});

const props = defineProps({
  color: {
    type: String,
    default: "#fff",
  },
})

const computedCssStyles = computed(() => {
  return {
    "--accent-color": props.color
  }
})

</script>

<style lang="scss">
@use "../assets/vars";

.section-checkbox {
  margin: 0;
  height: 32px;
  display: flex;
  align-items: center;

  padding: 0 8px;
  border-radius: 4px;
  gap: 8px;

  &:hover {
    cursor: pointer;
    background-color: vars.$el-bg;


  }

  & > p {
    margin: 0;
    font-size: 14px;
    letter-spacing: 1px;
    color: #ccc;
  }

  & > input {
    margin: 0;
    height: 14px;
    width: 14px;
    accent-color: var(--accent-color);

  }

  & > input:not(:checked) {
    margin: 0;
    appearance: none;
    border-radius: 2px;
    border: var(--accent-color) 2px solid;
  }

}
</style>