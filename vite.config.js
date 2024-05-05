import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";

const scssPath = {
  mixins: "@/assets/scss/mixins/_mixins.scss",
  variables: "@/assets/scss/variables/_variables.scss",
  // add more file here
};

/* CONFIG vite */
export default defineConfig({
  base: process.env.VITE_BASE_URL,
  plugins: [vue(), svgLoader()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: importScssFile(scssPath),
      },
    },
  },
});

/* FUNCTIONS */
function importScssFile(files) {
  let outputImports = "";

  for (let key in files) {
    const importPath = `@import "${files[key]}";`;
    outputImports += importPath;
  }

  return outputImports;
}
