<script setup>
import { defineModel, ref, defineEmits, onMounted, nextTick } from "vue";

const props = defineProps({
  button: Boolean,
});

const emit = defineEmits(["submit"]);

const model = defineModel();
const textArea = ref(null);

const keyPressed = {};
const enterKeyCode = 13;
const shiftKeyCode = 16;

function handleKeyDown(e) {
  activeKey(e);
  const resetEnterLineBreak = keyPressed[enterKeyCode] ? e.preventDefault() : null;
  const isComboShiftEnter = keyPressed[enterKeyCode] && keyPressed[shiftKeyCode];
  const isOnlyEnter = keyPressed[enterKeyCode] && !keyPressed[shiftKeyCode];

  if (isOnlyEnter) {
    sendDataInEmit();
  }

  if (isComboShiftEnter) {
    model.value += "\n";
  }
  autoResize();
}

function autoResize() {
  nextTick(() => {
    if (textArea.value) {
      textArea.value.style.height = "auto";
      textArea.value.style.height = `${textArea.value.scrollHeight}px`;
    }
  });
}

function sendDataInEmit() {
  emit("submit");
  model.value = "";
}

function activeKey(e) {
  keyPressed[e.keyCode] = true;
}

function desactiveKey(e) {
  keyPressed[e.keyCode] = false;
}
</script>
<template>
  <div class="textarea-resize" ref="textAreaResize">
    <textarea
      ref="textArea"
      @input="autoResize"
      @keydown="handleKeyDown"
      @keyup="desactiveKey"
      v-model="model"
      name=""
      id=""
      rows="1"
    ></textarea>
    <button class="btn-textarea" v-if="button" @click="sendDataInEmit">
      <div class="icon-btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-send"
        >
          <path d="m22 2-7 20-4-9-9-4Z" />
          <path d="M22 2 11 13" />
        </svg>
      </div>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.textarea-resize {
  min-height: 40px;
  display: flex;
}

textarea {
  overflow: hidden;
  resize: none;
  width: 100%;
  height: 100%;
}

.btn-textarea {
  background-color: var(--primary-color);
  width: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  .icon-btn {
    height: 1.3rem;
    color: var(--surface-a);
  }
}
</style>
