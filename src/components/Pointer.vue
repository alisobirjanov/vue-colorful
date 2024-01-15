<script setup lang="ts">
import { formatClassName } from '../utils'

interface Props {
  // className?: string;
  top?: number
  left: number
  color: string
}

withDefaults(defineProps<Props>(), { top: 0.5 })

const nodeClassName = formatClassName(['react-colorful__pointer'])
</script>

<template>
  <div
    :class="nodeClassName"
    :style="{
      top: `${top * 100}%`,
      left: `${left * 100}%`,
    }"
  >
    <div class="react-colorful__pointer-fill" :style="{ backgroundColor: color }" />
  </div>
</template>
