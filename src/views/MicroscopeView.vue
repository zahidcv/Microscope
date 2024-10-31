<script setup>
import { ref, onMounted } from 'vue';
import HeaderComponent from '@/components/microscope/HeaderComponent.vue';
import SideBarComponent from '@/components/microscope/SideBarComponent.vue';
import CodeEditorComponent from '@/components/microscope/CodeEditorComponent.vue';

const myCode = ref("<?php\necho 'Intital Code'")
const allScripts = ref([]);

const handleScriptEvent = (scriptsData) => {
  allScripts.value = scriptsData;
  if (scriptsData.length > 0) {
    myCode.value = scriptsData[0].code;  // Update myCode with the first script's code
    console.log('In MicroscopeView: got the data');  // Log the updated value
  }
}

// allScripts.forEach((element, index) => {
//   console.log(element)
// });

</script>

<template>
  <div class="container-fluid microscope-view p-5">
    <div class="row mb-3">
      <div class="col">
        <HeaderComponent title="🔬 Microscope" class="header" />
      </div>
    </div>
    <div class="row">
      <div class="col-3">
        <SideBarComponent @script-event="handleScriptEvent" />
      </div>
      <div class="col-9">
        <!-- <SideBarComponent /> -->
        <div class="row mb-5" v-for="(currentScript, index) in allScripts" :key="currentScript.id"
          :id="currentScript.id">
          <div class="col">
            <CodeEditorComponent v-model="currentScript.code" :id="currentScript.id" :scriptName="currentScript.title"
              :taskName="currentScript.taskName" />
          </div>

        </div>
        <!-- <CodeEditorComponent v-model="myCode" :initial-code="myCode" /> -->

      </div>
    </div>
  </div>
</template>
<style scoped>
.microscope-view {
  height: 100%;
  background-color: #11182733;
  /* Dark theme background */
  background-image: radial-gradient(circle, #9c9b9b0f 0.8px, transparent 1px);
  background-size: 20px 20px;
  color: #ffffff;
  /* Dark theme text */
  padding: 20px;
  border-radius: 5px;
  /* transition: background-color 0.3s, color 0.3s; Smooth transition */
}
</style>