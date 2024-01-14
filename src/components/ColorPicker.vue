<script setup lang="ts">
// import { useColorManipulation } from "../../hooks/useColorManipulation";
// import { useStyleSheet } from "../../hooks/useStyleSheet";
// import { ColorModel, ColorPickerBaseProps, AnyColor } from "../types";

import { formatClassName } from '../utils'
import { useColorManipulation } from '../hooks/useColorManipulation'
import Saturation from './Saturation.vue'
import Hue from './Hue.vue'

// interface Props<T extends AnyColor> extends Partial < ColorPickerBaseProps < T >> {
//   colorModel: ColorModel<T>;
// }

interface Props {
  colorModel: any
  color?: string
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
    <Hue :hue="hsva.h" class="react-colorful__last-control" @on-change="updateHsva" />
  </div>
</template>
