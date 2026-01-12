<script setup lang="ts">
import HeaderComponent from '@/components/HeaderComponent.vue';
import { RouterView } from 'vue-router';

</script>

<template>
    <header class="shrink-0">
      <HeaderComponent />
    </header>
    <RouterView />
</template>