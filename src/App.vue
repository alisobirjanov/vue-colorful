<script setup lang="ts">
import ColorPicker from './components/ColorPicker.vue'

import { equalColorObjects, hsvaToRgba, rgbaToHsva, rgbaToRgb } from './utils'
import type { ColorModel, RgbColor } from './types'

const colorModel: ColorModel<RgbColor> = {
  defaultColor: { r: 0, g: 0, b: 0 },
  toHsva: ({ r, g, b }) => rgbaToHsva({ r, g, b, a: 1 }),
  fromHsva: hsva => rgbaToRgb(hsvaToRgba(hsva)),
  equal: equalColorObjects,
}

function onChange(v: string) {
  console.log(v)
}
</script>

<template>
  <div>
    <ColorPicker :color-model="colorModel" @on-change="onChange" />

    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><rect x="8" width="8" height="8" /><rect y="8" width="8" height="8" /></svg>
  </div>
</template>
