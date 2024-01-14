// import { useState, useEffect, useCallback, useRef } from "react";
import { ref, watch } from 'vue'
import type { AnyColor, ColorModel, HsvaColor } from '../types'
import { equalColorObjects } from '../utils'

// import { useEventCallback } from "./useEventCallback";

export function useColorManipulation<T extends AnyColor>(
  colorModel: ColorModel<T>,
  color: T,
  onChange?: (color: T) => void,
): [HsvaColor, (color: Partial<HsvaColor>) => void] {
  // Save onChange callback in the ref for avoiding "useCallback hell"
  const onChangeCallback = onChange

  // No matter which color model is used (HEX, RGB(A) or HSL(A)),
  // all internal calculations are based on HSVA model
  const hsva = ref<HsvaColor>(colorModel.toHsva(color))

  // By using this ref we're able to prevent extra updates
  // and the effects recursion during the color conversion
  const cache = ref({ color, hsva: hsva.value })

  watch([
    () => color,
    () => colorModel,
  ], () => {
    if (!colorModel.equal(color, cache.value.color)) {
      const newHsva = colorModel.toHsva(color)
      cache.value = { hsva: newHsva, color }
      hsva.value = newHsva
    }
  })

  watch([
    () => color,
    () => colorModel,
  ], () => {
    let newColor
    if (
      !equalColorObjects(hsva.value, cache.value.hsva)
      && !colorModel.equal((newColor = colorModel.fromHsva(hsva.value)), cache.value.color)
    ) {
      cache.value = { hsva: hsva.value, color: newColor }
      hsva.value = newColor
      
    }
  })

  // Update local HSVA-value if `color` property value is changed,
  // but only if that's not the same color that we just sent to the parent
  // useEffect(() => {
  //   if (!colorModel.equal(color, cache.value.color)) {
  //     const newHsva = colorModel.toHsva(color);
  //     cache.current = { hsva: newHsva, color };
  //     updateHsva(newHsva);
  //   }
  // }, [color, colorModel]);

  // Trigger `onChange` callback only if an updated color is different from cached one;
  // save the new color to the ref to prevent unnecessary updates
  // useEffect(() => {
  //   let newColor;
  //   if (
  //     !equalColorObjects(hsva, cache.value.hsva) &&
  //     !colorModel.equal((newColor = colorModel.fromHsva(hsva.value)), cache.value.color)
  //   ) {
  //     cache.current = { hsva, color: newColor };
  //     onChangeCallback(newColor);
  //   }
  // }, [hsva, colorModel, onChangeCallback]);

  // Merge the current HSVA color object with updated params.
  // For example, when a child component sends `h` or `s` only
  const handleChange = (params: any) => {
    // console.log(params, 'params')
    hsva.value = Object.assign({}, hsva.value, params)
    onChangeCallback(colorModel.fromHsva(hsva.value))
  }

  return [hsva, handleChange]
}
