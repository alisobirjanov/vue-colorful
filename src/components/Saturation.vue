<script setup lang="ts">
import { computed } from 'vue'
import { clamp, hsvaToHslString, round } from '../utils'
import type { Interaction } from './Interactive.vue'
import Interactive from './Interactive.vue'
import Pointer from './Pointer.vue'

// import { HsvaColor } from "../../types";

interface Props {
  hsva: HsvaColor
}
const { hsva } = defineProps<Props>()

const emit = defineEmits<{
  (e: 'onChange', newColor: { s: number, v: number }): void
}>()

type HsvaColor = any

const handleMove = (interaction: Interaction) => {
  emit('onChange', {
    s: interaction.left * 100,
    v: 100 - interaction.top * 100,
  })
}

const handleKey = (offset: Interaction) => {
  // Saturation and brightness always fit into [0, 100] range
  emit('onChange', {
    s: clamp(hsva.s + offset.left * 100, 0, 100),
    v: clamp(hsva.v - offset.top * 100, 0, 100),
  })
}

const containerStyle = computed(() => ({
  backgroundColor: hsvaToHslString({ h: hsva.h, s: 100, v: 100, a: 1 }),
}))
</script>

<template>
  <div className="react-colorful__saturation" :style="containerStyle">
    <Interactive
      aria-label="Color"
      :aria-valuetext="`Saturation ${round(hsva.s)}%, Brightness ${round(hsva.v)}%`"
      @on-move="handleMove"
      @on-key="handleKey"
    >
      <Pointer
        class="react-colorful__saturation-pointer"
        :top="1 - hsva.v / 100"
        :left="hsva.s / 100"
        :color="hsvaToHslString(hsva)"
      />
    </Interactive>
  </div>
</template>
