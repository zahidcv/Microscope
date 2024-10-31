import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/main.css'
import { install as VueMonacoEditorPlugin } from '@guolao/vue-monaco-editor'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// Import Bootstrap CSS


const app = createApp(App)

app.use(router)
app.use(VueMonacoEditorPlugin, {
    paths: {
      // The recommended CDN config
      vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.43.0/min/vs'
    },
  })
app.mount('#app')
