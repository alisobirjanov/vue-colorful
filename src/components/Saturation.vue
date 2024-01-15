<script setup lang="ts">
import { clamp, hsvaToHslString, round } from '../utils';
import type { Interaction } from './Interactive.vue';
import Interactive from './Interactive.vue';
import Pointer from './Pointer.vue';

// import { HsvaColor } from "../../types";

interface Props {
  hsva: HsvaColor
}
const props = defineProps<Props>()

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
    s: clamp(props.hsva.s + offset.left * 100, 0, 100),
    v: clamp(props.hsva.v - offset.top * 100, 0, 100),
  })
}

// const containerStyle = computed(() => {
//   return {
//     backgroundColor: hsvaToHslString({ h: hsva.h, s: 100, v: 100, a: 1 }),
//   }
// })

// const containerStyle = ref({
//   backgroundColor: hsvaToHslString({ h: hsva.h, s: 100, v: 100, a: 1 }),
// })

// watch(() => hsva, () => {
//   containerStyle.value.backgroundColor = hsvaToHslString({ h: hsva.h, s: 100, v: 100, a: 1 })
//   console.log('watch')
// })
</script>

<template>
  <div className="vue-colorful__saturation" :style="{ backgroundColor: hsvaToHslString({ h: hsva.h, s: 100, v: 100, a: 1 }) }">
    <Interactive
      aria-label="Color"
      :aria-valuetext="`Saturation ${round(hsva.s)}%, Brightness ${round(hsva.v)}%`"
      @on-move="handleMove"
      @on-key="handleKey"
    >
      <Pointer
        class="vue-colorful__saturation-pointer"
        :top="1 - hsva.v / 100"
        :left="hsva.s / 100"
        :color="hsvaToHslString(hsva)"
      />
    </Interactive>
  </div>
</template>
