import { equalColorObjects, equalColorString, equalHex, hexToHsva, hslaStringToHsva, hslaToHsl, hslaToHsva, hslStringToHsva, hsvaStringToHsva, hsvaToHex, hsvaToHsla, hsvaToHslaString, hsvaToHslString, hsvaToHsv, hsvaToHsvaString, hsvaToHsvString, hsvaToRgba, hsvaToRgbaString, hsvaToRgbString, hsvStringToHsva, rgbaStringToHsva, rgbaToHsva, rgbaToRgb, rgbStringToHsva, roundHsva } from './utils'
import type { ColorModel, HslColor, RgbColor, RgbaColor, HsvaColor, HsvColor } from './types'

export const rgbaColorModel: ColorModel<RgbaColor> = {
  defaultColor: { r: 0, g: 0, b: 0, a: 1 },
  toHsva: rgbaToHsva,
  fromHsva: hsvaToRgba,
  equal: equalColorObjects
}

export const rgbaStringColorModel: ColorModel<string> = {
  defaultColor: "rgba(0, 0, 0, 1)",
  toHsva: rgbaStringToHsva,
  fromHsva: hsvaToRgbaString,
  equal: equalColorString,
}

export const rgbColorModel: ColorModel<RgbColor> = {
  defaultColor: { r: 0, g: 0, b: 0 },
  toHsva: ({ r, g, b }) => rgbaToHsva({ r, g, b, a: 1 }),
  fromHsva: hsva => rgbaToRgb(hsvaToRgba(hsva)),
  equal: equalColorObjects
}

export const rgbStringColorModel: ColorModel<string> = {
  defaultColor: "rgb(0, 0, 0)",
  toHsva: rgbStringToHsva,
  fromHsva: hsvaToRgbString,
  equal: equalColorString,
};


export const hexColorModel: ColorModel<string> = {
  defaultColor: "000",
  toHsva: hexToHsva,
  fromHsva: ({ h, s, v }) => hsvaToHex({ h, s, v, a: 1 }),
  equal: equalHex
}

export const hslaStringColorModel: ColorModel<string> = {
  defaultColor: "hsla(0, 0%, 0%, 1)",
  toHsva: hslaStringToHsva,
  fromHsva: hsvaToHslaString,
  equal: equalColorString,
}

export const hslColorModel: ColorModel<HslColor> = {
  defaultColor: { h: 0, s: 0, l: 0 },
  toHsva: ({ h, s, l }) => hslaToHsva({ h, s, l, a: 1 }),
  fromHsva: (hsva) => hslaToHsl(hsvaToHsla(hsva)),
  equal: equalColorObjects,
}

export const hslStringColorModel: ColorModel<string> = {
  defaultColor: "hsl(0, 0%, 0%)",
  toHsva: hslStringToHsva,
  fromHsva: hsvaToHslString,
  equal: equalColorString,
}

export const hsvaColorModel: ColorModel<HsvaColor> = {
  defaultColor: { h: 0, s: 0, v: 0, a: 1 },
  toHsva: (hsva) => hsva,
  fromHsva: roundHsva,
  equal: equalColorObjects,
}

export const hsvaStringColorModel: ColorModel<string> = {
  defaultColor: "hsva(0, 0%, 0%, 1)",
  toHsva: hsvaStringToHsva,
  fromHsva: hsvaToHsvaString,
  equal: equalColorString,
}

export const hsvColorModel: ColorModel<HsvColor> = {
  defaultColor: { h: 0, s: 0, v: 0 },
  toHsva: ({ h, s, v }) => ({ h, s, v, a: 1 }),
  fromHsva: hsvaToHsv,
  equal: equalColorObjects,
}

export const hsvStringColorModel: ColorModel<string> = {
  defaultColor: "hsv(0, 0%, 0%)",
  toHsva: hsvStringToHsva,
  fromHsva: hsvaToHsvString,
  equal: equalColorString,
}