<script setup lang="ts">
import { clamp, hsvaToHslString, round } from '../utils';
import type { Interaction } from './Interactive.vue';
import Interactive from './Interactive.vue';
import Pointer from './Pointer.vue';

interface Props {
  hue: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'onChange', newHue: { h: number }): void
}>()

const handleMove = (interaction: Interaction) => {
  emit('onChange', { h: 360 * interaction.left })
}

const handleKey = (offset: Interaction) => {
  // Hue measured in degrees of the color circle ranging from 0 to 360
  emit('onChange', {
    h: clamp(props.hue + offset.left * 360, 0, 360),
  })
}

</script>

<template>
  <div class="vue-colorful__hue">
    <Interactive
      aria-label="Hue" :aria-valuenow="round(hue)" aria-valuemax="360" aria-valuemin="0" @on-move="handleMove"
      @on-key="handleKey"
    >
      <Pointer
        class="vue-colorful__hue-pointer" :left="hue / 360"
        :color="hsvaToHslString({ h: hue, s: 100, v: 100, a: 1 })"
      />
    </Interactive>
  </div>
</template>
