<template>
  <div class="section-checkbox" :style="computedCssStyles" ref="root" :data-name="name">
    <input v-if="icon" :type="radio?'radio':'checkbox'" :name="name" ref="input" :data-radio="radio" :data-fullbar="fullbar"/>
    <p>
      <slot></slot>
    </p>
  </div>
</template>

<script lang="ts" setup>
import {computed, onMounted, Ref, ref} from "vue";

const root = <Ref<HTMLDivElement>><any>ref(null)
const input = <Ref<HTMLInputElement>><any>ref(null)

const props = defineProps({
  color: {
    type: String,
    default: "#fff",
  },
  name: {
    type: String,
  },
  radio:{
    type: Boolean,
    default: false,
  },
  icon:{
    type: Boolean,
    default: true,
  },
  fullbar:{
    type: Boolean,
    default: false,
  },
})



onMounted(() => {
  if (!props.fullbar){
    root.value.addEventListener("click", (e: Event) => {
      const input = root.value.querySelector("input") as HTMLInputElement;
      input.click()
    });
  }
  else{
    root.value.addEventListener("click", (e: Event) => {
      if (props.radio){
        root.value.setAttribute("checked","true")
        document.querySelectorAll<HTMLDivElement>(`.section-checkbox[data-name="${props.name}"]`).forEach(el => {
          if (el !== root.value){
            el.setAttribute("checked","false")
          }
        })
      }
      else{
        let val = root.value.getAttribute("checked")
        if (val === "false" || val===null){
          root.value.setAttribute("checked","true")
        }
        else{
          root.value.setAttribute("checked","false")
        }

      }
    });
  }
});


const computedCssStyles = computed(() => {
  return {
    "--accent-color": props.color,
    "--border-rad": props.radio?"100%":"3px",
    "--radio": props.radio,
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
  margin: 4px 0;
  padding: 0 8px;
  border-radius: 4px;
  gap: 8px;
  transition: all 128ms ease-in;

  &[checked="true"] {
    background-color: vars.$accent!important;
    &>p{
      font-size: 16px;
      font-weight: 600;
      color: black;
    }
  }


  &:hover {
    cursor: pointer;
    background-color: vars.$el-bg;
  }

  & > p {
    margin: 0;
    font-size: 14px;
    letter-spacing: 1px;
    color: #ccc;
    font-weight: 400;
    transition: font-size 0.1s ease;
  }

  & > input {
    margin: 0;
    height: 14px;
    width: 14px;
    accent-color: var(--accent-color);
    &[data-fullbar="true"]{
      accent-color: vars.$accent;
    }
  }

  & > input:not(:checked) {
    margin: 0;
    appearance: none;
    border-radius: var(--border-rad);
    border: var(--accent-color) 2px solid;
    &[data-fullbar="true"]{
      border: vars.$accent 2px solid;
    }
  }

}
</style>