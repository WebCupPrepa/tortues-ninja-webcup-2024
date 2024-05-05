<script setup>
import { computed, onMounted, onUnmounted, onUpdated, ref, toRefs } from "vue";
import { toastType } from "./toastType.js";

const emit = defineEmits(["deleteToast"]);

const props = defineProps({
  title: String,
  message: String,
  type: String,
  id: String,
});

const toast = ref(null);
const progressToast = ref(null);
const { title, message, type, id } = toRefs(props);

const iconName = computed(() => {
  switch (type.value) {
    case toastType.success:
      return "check";
    case toastType.error:
      return "exclamation";
    default:
      return "info";
  }
});

// Déclarez intervalId dans une portée accessible par onMounted et onUnmounted
let intervalId = null;

onMounted(() => {
  let progressWidth = 0;
  const maxWidth = 100;
  const timer = 5000;
  // Calculez l'intervalle de temps pour chaque % d'augmentation
  const intervalComparedTimer = timer / maxWidth;
  intervalId = setInterval(() => {
    if (progressWidth < maxWidth) {
      progressWidth++;
      if (progressToast.value) {
        // Assurez que progressToast n'est pas null
        progressToast.value.style.width = progressWidth + "%";
      }
    } else {
      emit("deleteToast", id.value);
      clearInterval(intervalId);
    }
  }, intervalComparedTimer);
});
</script>

<template>
  <div :class="`toast toast--${type}`" ref="toast">
    <div class="header-toast">
      <!-- HEADER -->
      <div class="start-header-toast">
        <div class="icon-toast">
          <Icon :name="iconName" size="100%" directory="bootstrap"></Icon>
        </div>
        <span class="title__toast">{{ title }}</span>
      </div>
      <div class="close-toast">
        <Icon name="x" size="100%" @click="emit('deleteToast', id)"></Icon>
      </div>
    </div>
    <div class="main-toast">
      <p class="message__toast" v-if="message">{{ message }}</p>
    </div>
    <div class="progress-bottom-toast" ref="progressToast"></div>
  </div>
</template>

<style lang="scss">
$icon-size: 20px;

.toast {
  padding: 0.6rem 1rem;
  padding-bottom: 0.7rem;
  font-weight: 500;
  border-radius: var(--border-radius-secondary);
  position: relative;
  overflow: hidden;
  @include zIndex("toast");
}

.header-toast {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.start-header-toast {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.icon-toast {
  width: $icon-size;
  height: $icon-size;
  background-color: white;
  border-radius: 50%;
}

.title__toast {
  font-weight: 500;
  color: white;
  display: inline-block;
}

.message__toast {
  margin-top: 0.2rem;
  color: rgba(255, 255, 255, 0.799);
  font-size: 0.9rem;
  font-weight: 400;
}

.close-toast {
  height: 1.6rem;
  border-radius: 0.3rem;
  padding: 0.2rem;
  color: white;
  cursor: pointer;
  transition: var(--transition-duration);

  &:hover {
    background-color: rgba(255, 255, 255, 0.244);
  }
}

[data-theme="dark"] {
  .close-toast:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
// .main-toast {
//   padding: 1rem;
// }

.progress-bottom-toast {
  height: 5px;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0%;
  transition: 0.1s linear;
}

// VARIANTS

$box-shadow-base: 0px 2px 20px -10px;

.toast--error {
  background-color: var(--red-400);
  box-shadow: var(--red-300) $box-shadow-base;

  .icon-toast {
    color: var(--red-400);
  }

  .progress-bottom-toast {
    background-color: var(--red-600);
  }
}

.toast--success {
  background-color: var(--green-500);
  box-shadow: var(--green-300) $box-shadow-base;

  .icon-toast {
    color: var(--green-500);
  }

  .progress-bottom-toast {
    background-color: var(--green-600);
  }
}

.toast--info {
  background-color: var(--surface-900);
  box-shadow: var(--surface-600) $box-shadow-base;

  .icon-toast {
    background-color: var(--surface-a);
  }

  .close-toast {
    color: var(--surface-a);
  }

  .title__toast {
    color: var(--surface-a);
  }

  .message__toast {
    color: var(--surface-200);
  }

  .progress-bottom-toast {
    background-color: var(--surface-500);
  }
}
</style>
