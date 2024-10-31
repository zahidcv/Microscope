<script setup>
import { RouterLink, RouterView } from 'vue-router'
import MicroscopeView from './views/MicroscopeView.vue';
import CodeEditorComponent from '@/components/microscope/CodeEditorComponent.vue';
import SideBarComponent from './components/microscope/SideBarComponent.vue';
import HeaderComponent from './components/microscope/HeaderComponent.vue';
</script>

<template>
  <MicroscopeView />
</template>
