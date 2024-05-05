<script setup>
import { defineProps, defineModel, defineComponent } from "vue";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

const props = defineProps({
  label: String,
});
const model = defineModel();

const toolbarOptions = [
  { header: [1, 2, 3, 4, 5, 6, false] },
  "bold",
  "italic",
  "underline",
  "strike",
  "link",
  "video",
  "code-block",
  "image",
  { color: [] },
  { background: [] },
];

defineComponent({
  components: {
    QuillEditor,
  },
});
</script>
<template>
  <div class="input-rich-text">
    <label v-if="label" class="label label--input">{{ label }}</label>
    <QuillEditor
      theme="snow"
      content-type="html"
      v-model:content="model"
      :toolbar="toolbarOptions"
    />
  </div>
</template>

<style lang="scss" scoped>
.input-rich-text {
  margin-top: 1rem;
  width: 100%;

  img {
    max-height: 800px;
  }
}

[data-theme="light"] {
  .input-rich-text {
    :deep(.ql-toolbar) {
      background-color: var(--surface-50);
    }
  }
}

[data-theme="dark"] {
  .input-rich-text {
    :deep(.ql-toolbar) {
      background-color: var(--surface-200);
    }
  }
}

:deep(.ql-container),
:deep(.ql-toolbar) {
  border: solid 1px var(--surface-border);
}

:deep(.ql-formats) {
  * {
    color: var(--text-color-secondary);
    stroke: var(--text-color-secondary);
  }
}

:deep(.ql-editor) {
  background-color: var(--surface-card);
  min-height: 150px;
  color: var(--text-color);
  img {
    max-height: 50vh;
    object-fit: contain;
  }
}

:deep(.ql-picker-label.ql-active) {
  color: var(--primary-color) !important;
  background-color: var(--surface-300) !important;
}

:deep(.ql-tooltip.ql-editing) {
  @include zIndex("navbar", "front");
}
</style>
