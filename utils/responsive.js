// utils/responsive.js
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

// Tamaño base que utilizaste en tu AppContent
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

// Escalas
const scaleW = width / guidelineBaseWidth;
const scaleH = height / guidelineBaseHeight;
const scale = Math.min(scaleW, scaleH);

/**
 * Escala un tamaño horizontal de manera proporcional
 * @param {number} size
 * @returns {number}
 */
export const responsiveSize = (size) => size * scale;

/**
 * Escala un tamaño vertical de manera proporcional
 * @param {number} size
 * @returns {number}
 */
export const responsiveVertical = (size) => size * scaleH;

/**
 * Escala un tamaño de fuente de manera proporcional
 * Puedes usarlo para que los textos sean responsive también
 * @param {number} size
 * @returns {number}
 */
export const responsiveFont = (size) => size * scale;
