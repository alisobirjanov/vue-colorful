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

<script setup lang="ts">
import { formatClassName } from '../utils'

interface Props {
  // className?: string;
  top?: number;
  left: number;
  color: string;
}

const { top = 0 } = defineProps<Props>()

const nodeClassName = formatClassName(["react-colorful__pointer", /* className */]);

</script>