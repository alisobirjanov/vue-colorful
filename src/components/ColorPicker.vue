<script setup lang="ts">
import { ref, watch } from 'vue'
import { hsvaColorModel } from '../models'

import Hue from './Hue.vue'
import Alpha from './Alpha.vue'
import Saturation from './Saturation.vue'
import { AnyColor, ColorModel, HsvaColor } from '../types'


interface Props {
  colorModel?: ColorModel<any>
  modelValue?: AnyColor
  alpha: boolean
}

const props = withDefaults(defineProps<Props>(), {
  colorModel: () => hsvaColorModel
})

const emit = defineEmits<{
  (e: 'update:modelValue', newColor: AnyColor): void
}>()

let cache: HsvaColor = props.colorModel.defaultColor
let hasChange = false

const initialValue = props.colorModel.toHsva(props.modelValue || cache)
const hsva = ref(initialValue)

function updateHsva(newColor: any) {
  cache = Object.assign({}, cache, newColor)
  hsva.value = cache
  hasChange = true
  emit('update:modelValue', props.colorModel.fromHsva(cache))
}

watch(() => props.modelValue, (newValue: any) => {
  if(hasChange) {
    return hasChange = false
  }
  cache = props.colorModel.toHsva(newValue)
  hsva.value = cache
})

</script>

<template>
  <div class="react-colorful">
    <Saturation :hsva="hsva" @on-change="updateHsva" />
    <div class="vue-colorful__controls">
      <Hue :hue="hsva.h" @on-change="updateHsva" class="vue-colorful__control" />
      <Alpha v-if="alpha" :hsva="hsva"  @on-change="updateHsva" class="vue-colorful__control"/>
    </div>
  </div>
</template>
