import Tesseract from "tesseract.js";

export async function extractTextFromImage(imageFile) {
  const result = await Tesseract.recognize(imageFile, "eng");
  return result.data.text;
}