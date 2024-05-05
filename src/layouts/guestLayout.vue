<script setup>
import Navbar from "@/components/global/navbar/Navbar.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <div class="wrapper-guest">
    <navbar></navbar>
    <div class="guest-layout">
      <router-view v-slot="{ Component, route }">
        <transition name="route">
          <component :is="Component"></component>
        </transition>
      </router-view>
    </div>
  </div>
</template>

<style lang="scss"></style>
