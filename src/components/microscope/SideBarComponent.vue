<script setup>
import { ref, onMounted } from 'vue';
import CardComponent from './CardComponent.vue';
const emit = defineEmits();

const processes = ref([]);
const loading = ref(true); // Track loading state
const error = ref(null);   // Track errors
const selectedCard = ref(null);
const scripts = ref([]);


const myHeaders = new Headers();
myHeaders.append("Accept", "application/json");
myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiMWNjMDdjMTNmMTE0MTJkMDQ4MGU2NmUzNzM2ZmVmMGFlNTAzZmM5NDQ0MmFiZDc5ZWI1YzI3NzJhZTRmZjkzMDI4ZTZjNDRkY2Y0OWY2YTUiLCJpYXQiOjE3Mjg3MTYzNTYuODYzMjQxLCJuYmYiOjE3Mjg3MTYzNTYuODYzMjQyLCJleHAiOjE3NjAyNTIzNTYuODM4OTE2LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.l-hwlG06rRyAsExiq6BxH9sTZJ2klmdUpoel2zrbd-v8B0wwclStdYzVJ-sjT33b7rH82VrpS1D_Qt5JZnfTy3CEYF75rXZZobyCd7H8dd8qhgxoAGkbcFSsFxJtpDVzhRprekxC_PCcRQEChyoRTykEtpz8VA1XAwrlpsMQL1BuT0OgsVN1C8pEnx60wj3LxyFtsNBWhGgI6Xv_ERxHJwcO8b_2V5nfbnR_m44pm0wcWyNMTXnDZ487DM6ITZGXZk5zbbGU-GW7hHafLQnsnxS5YV8mq5Jyj0TA0RsanQPA3ryr-cbaklvpct5UxtWByVoR8LKJGyoUUcvwGfI1VSZIJpzM2xL8DVoL0qr1fhYB0V9aPRl0agNlo7PE937I1hBAb4jXPJUx0M6ruLP4vfkgC1RmrCTkjNibhYYZeC-vaYDcyhENJgrBefHkrKTDGMUsI_kHsv2NmW0xH-hNVlXT6yLCklF7lMiLUATj6JrZ6gfW_SJGtWAw0mVLrzFyvPMjucHHy55uxVfsyFbxuxIlIzD9vvImBznHc4OwgI2rib84KtPI6F1AzgFq4PuhIBPRnXcG_tDiReYo1yHYiZ5f4x9BXTYdSA6y5qPkXfSa19HVLeHlJgLcL0GUO8hANfE0dXPqh-LxP-UQD9QjAhpIzsse8-vAf8IysnNSRN8");

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

const pmApiBase = 'http://workflow.test/api/1.0';
const fetchSpecificProcessData = async (processId) => {
  fetch(`${pmApiBase}/process-scripts/${processId}`, requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(scriptsData => {
      scripts.value = scriptsData;
      // console.log(scriptsData)
      console.log('In sidebar Component: Scripts fetched for process - ', processId)
      emit('script-event', scriptsData);
    })
    .catch(error => {
      console.error('Error fetching processes:', error);
    });
}

const fetchData = async () => {

  fetch(`${pmApiBase}/processes?order_direction=asc&page=1&per_page=100`, requestOptions)

    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json(); // Parse JSON response
    })
    .then(data => {
      processes.value = data.data; // Assign the 'data' array to the processes ref
      console.log('In sidebar: All Processes are fetched')
    })
    .catch(error => {
      console.error('Error fetching processes:', error);
    });
}


function handleCardSelect(selectedId) {
  selectedCard.value = selectedId;
  console.log('In Sidebar: Selected Process ID: ', selectedId);
  fetchSpecificProcessData(selectedId);
}

onMounted(fetchData); // Fetch data when component mounts
console.log('Sidebar mounted')
</script>


<template>
  <!-- <div class="d-flex ">
    <h3 class="mx-auto">Process Names</h3>
  </div> -->
  <div class="sidebar">
    <!-- v-for="item in items" :key="item.id" -->
    <!-- <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div> -->

    <CardComponent v-for="(process, index) in processes" :key="process.id" :id="process.id" :title="process.name"
      :isSelected="selectedCard === process.id" @select-card="handleCardSelect" />

  </div>
</template>

<style scoped>
.sidebar {
  position: sticky;
  top: 0;
  /* height: 100vh; */
  height: 70vh;
  /* Make it full height of the viewport */
  overflow-y: auto;
  border-radius: 5px;
  background-color: #1723359a;
  /* border-right: 1px solid #374151; */
}

* {
  scrollbar-width: thin;
  /* Thin scrollbar */
  scrollbar-color: #545455 #11182733;
  /* Thumb and track colors */
}
</style>