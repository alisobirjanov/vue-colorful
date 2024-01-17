<script setup lang="ts">
import { ref } from 'vue'
import ColorPicker from './components/ColorPicker.vue'
import { rgbaColorModel } from './models'

const rgbaColor = ref()

</script>

<template>
  <div>
    <ColorPicker :color-model="rgbaColorModel" v-model="rgbaColor" :alpha="false"/>
  </div>
</template>
