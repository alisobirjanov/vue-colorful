<script setup lang="ts">
interface Props {
  // className?: string;
  top?: number
  left: number
  color: string
}

withDefaults(defineProps<Props>(), { top: 0.5 })
</script>

<template>
  <div
    class="vue-colorful__pointer"
    :style="{
      top: `${top * 100}%`,
      left: `${left * 100}%`,
    }"
  >
    <div class="vue-colorful__pointer-fill" :style="{ backgroundColor: color }" />
  </div>
</template>
