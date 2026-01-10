<script setup>
import { RouterView } from 'vue-router';
import HeaderComponent from './components/HeaderComponent.vue';
import { ref } from 'vue';
import ToastComponent from './components/ToastComponent.vue';
const message = ref('')
const show = ref(false)
const type = ref('')
</script>

<template>
  <div class="w-dvw h-dvh flex flex-col">
    <header class="shrink-0">
      <HeaderComponent />
    </header>

    <main class="flex-1 w-full overflow-auto">
      <RouterView />
      <ToastComponent v-model:show="show" :type="type" :message="message" />
    </main>
  </div>
</template>