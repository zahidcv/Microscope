<template>
    <div class="editor-wrapper my-3">
        <div class="m-2 fs-5 d-flex justify-content-end">
            Script Name: <span class="script-title px-2 me-3 fw-bold">{{ scriptName }}</span>
            Task Name: <span class="script-title px-2 fw-bold">{{ taskName }}</span>
            <!-- Task Name: <span>{{ taskName }}</span> -->
        </div>
        <MonacoEditor v-model:value="code" :options="editorOptions" language="php" @mount="handleMount"
            theme="vs-dark" />
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import MonacoEditor from '@guolao/vue-monaco-editor';

const props = defineProps({
    modelValue: {  // Use modelValue for v-model
        type: String,
        default: ''
    },
    scriptName: {
        type: String,
        default: 'No title'
    },
    taskName: {
        type: String,
        default: 'No Task Name'
    }

});

const code = ref(props.modelValue);  // Initialize code with modelValue

// Watch for changes to the modelValue prop and update code accordingly
watch(() => props.modelValue, (newCode) => {
    code.value = newCode;
});

// Watch for changes in code and emit updates
watch(code, (newCode) => {
    emit('update:modelValue', newCode);
});

const editorOptions = {
    automaticLayout: true,
    minimap: { enabled: false },
    lineNumbers: 'on',
    scrollBeyondLastLine: false,
};

const emit = defineEmits(['update:modelValue']);

const handleMount = (editor) => {
    // Custom editor configuration can be added here
};
</script>

<style scoped>
.editor-wrapper {
    /* overflow-y: auto;
    max-height: 80vh; */
    width: 100%;
    height: 500px;
    /* Fixed height - adjust as needed */
    /* border: 1px solid #374151; */
    border-radius: 5px;
}

.script-title {
    background-color: #091831;
    border-radius: 5px;
}
</style>
