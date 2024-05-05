<script setup>
import { onMounted, ref, onUnmounted } from "vue";
import { onBeforeRouteLeave, onBeforeRouteUpdate } from "vue-router";

const props = defineProps({
  links: Array,
  name: String,
});

/* link example 
{
  url : "", 
  text: "", 
  icon : ""
}
*/

const linkListElement = ref(null);
const showList = ref(false);
const chevron = ref(null);

function toggleList() {
  showList.value = !showList.value;
  rotateChevron(showList);
}

function rotateChevron(showList) {
  const animation = (deg) => (chevron.value.dom.style.transform = `rotate(${deg}deg)`);
  return showList.value ? animation(180) : animation(0);
}

function handleClickOutside(event) {
  if (!linkListElement.value.contains(event.target) && showList.value) {
    showList.value = false;
    rotateChevron(showList);
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

onBeforeRouteUpdate((to) => {
  if (showList.value) toggleList();
});
</script>

<template>
  <div class="link-list" ref="linkListElement">
    <div class="link" @click="toggleList">
      <slot>
        <span class="txt__link">{{ name }}</span>
      </slot>
      <Icon class="icon__link" name="chevron-down" ref="chevron" />
    </div>
    <transition name="slide-down">
      <div class="list" v-show="showList">
        <Link class="link" v-for="link of links" :url="link.url" :text="link.text"></Link>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.link-list {
  cursor: pointer;
  position: relative;

  .link {
    display: flex;
    gap: 0.2rem;
    align-items: center;
  }

  .icon__link {
    height: 1rem;
    transition: var(--transition-duration);
  }

  .list {
    min-width: 180px;
    padding: 1rem;
    position: absolute;
    top: 2rem;
    right: -0.5rem;
    background-color: var(--surface-card);
    border: solid 1px var(--surface-border);
    border-radius: var(--border-radius-secondary);

    .link {
      white-space: nowrap;
      margin-bottom: 1rem;
    }

    .link:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
