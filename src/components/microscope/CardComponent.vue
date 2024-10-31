<template>

  <div :class="[{ 'selected-card': isSelected }, { 'process-card': !isSelected }]" @click="selectCard">
    <p class="process-name">{{ title }}</p>
  </div>

</template>

<script setup>

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true

  },
  isSelected: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['select-card']);


function selectCard() {
  emit('select-card', props.id);
}
</script>


<style scoped>
.selected-card {
  background-color: #EF4444;
  color: #ffffff;
  padding: 1rem;
  font-family: Helvetica, Arial, sans-serif;

}

.process-name {
  font-size: 20px;
  font-weight: bold;
}

.process-card {
  font-family: Helvetica, Arial, sans-serif;
  background-color: #1723359a;
  transition: background-color 0.2s ease;
  cursor: pointer;
  color: #ffffff;
  padding: 1rem;
  border-bottom: 1px solid rgba(107, 114, 128, 0.075);
}

.process-card:hover {
  background-color: #EF4444;
}
</style>