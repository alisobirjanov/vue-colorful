<script setup lang="ts">
// import { useColorManipulation } from "../../hooks/useColorManipulation";
// import { useStyleSheet } from "../../hooks/useStyleSheet";
// import { ColorModel, ColorPickerBaseProps, AnyColor } from "../types";

import { useColorManipulation } from '../hooks/useColorManipulation'
import { formatClassName } from '../utils'
import Alpha from './Alpha.vue'
import Hue from './Hue.vue'
import Saturation from './Saturation.vue'

// interface Props<T extends AnyColor> extends Partial < ColorPickerBaseProps < T >> {
//   colorModel: ColorModel<T>;
// }

interface Props {
  colorModel: any
  color?: string
  alpha: boolean
}

const { colorModel, color = colorModel.defaultColor } = defineProps<Props>()

const emit = defineEmits<{
  (e: 'onChange', newColor: string): void
}>()

const nodeClassName = formatClassName(['react-colorful'])

const [hsva, updateHsva] = useColorManipulation(colorModel, color, e => emit('onChange', e))
</script>

<template>
  <div :class="nodeClassName">
    <Saturation :hsva="hsva" @on-change="updateHsva" />
    <Hue :hue="hsva.h" @on-change="updateHsva" />
    <Alpha :hsva="hsva" class="vue-colorful__last-control" @on-change="updateHsva" />
  </div>
</template>
