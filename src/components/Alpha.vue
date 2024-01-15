<script setup lang="ts">
import { computed } from 'vue'
import type { HsvaColor } from '../types'
import { clamp, formatClassName, hsvaToHslaString, round } from '../utils'
import type { Interaction } from './Interactive.vue'
import Interactive from './Interactive.vue'



interface Props {
  className?: string
  hsva: HsvaColor
}

const { hsva } = defineProps<Props>()

const emit = defineEmits<{
  (e: 'onChange', newAlpha: { a: number }): void
}>()

const handleMove = (interaction: Interaction) => {
  emit('onChange', { a: interaction.left })
}

const handleKey = (offset: Interaction) => {
  // Alpha always fit into [0, 1] range
  emit('onChange', { a: clamp(hsva.a + offset.left) })
}

const gradientStyle = computed(() => {
  // We use `Object.assign` instead of the spread operator
  // to prevent adding the polyfill (about 150 bytes gzipped)
  const colorFrom = hsvaToHslaString(Object.assign({}, hsva, { a: 0 }))
  const colorTo = hsvaToHslaString(Object.assign({}, hsva, { a: 1 }))
  return {
    backgroundImage: `linear-gradient(90deg, ${colorFrom}, ${colorTo})`,
  }
})

const nodeClassName = formatClassName(['react-colorful__alpha'])
const ariaValue = computed(() => round(hsva.a * 100))
</script>

<template>
  <div :class="nodeClassName">
    <div className="react-colorful__alpha-gradient" :style="gradientStyle" />
    <Interactive
      aria-label="Alpha"
      :aria-valuetext="`${ariaValue}%`"
      :aria-valuenow="ariaValue"
      aria-valuemin="0"
      aria-valuemax="100"
      @on-move="handleMove"
      @on-key="handleKey"
    >
      <Pointer
        class="react-colorful__alpha-pointer"
        :left="hsva.a"
        :color="hsvaToHslaString(hsva)"
      />
    </Interactive>
  </div>
</template>
