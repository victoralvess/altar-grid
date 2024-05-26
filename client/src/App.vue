<script setup lang="ts">
import { ref } from 'vue';
import Grid from './components/Grid.vue';
import GridCode from './components/GridCode.vue';
import axios from 'axios';

const BFF_API_URL = 'http://localhost:3000';
const axiosClient = axios.create({ baseURL: BFF_API_URL });

const grid = ref<string[][]>([]);
const code = ref<string | undefined>();
const live = ref<boolean>(false);

const fetchGrid = async () => {
  try {
    const gridResponse = await axiosClient.get('grid', { params: { bias: '' } });
    grid.value = gridResponse.data.grid;
  } catch (error) {
    console.error(error);
  }
}

const fetchCode = async () => {
  try {
    const codeResponse = await axiosClient.post('code', { grid: grid.value });
    code.value = codeResponse.data.code;
  } catch (error) {
    console.error(error);
  }
}

const gridInterval = ref<number | undefined>();
const generateGrid = () => {
  if (gridInterval.value) {
    return;
  }

  live.value = true;
  gridInterval.value = setInterval(async () => {
    await fetchGrid()
    await fetchCode()
  }, 2000);
}
</script>

<template>
  <main class="w-100 max-w-screen-md mx-auto mt-8">
    <div class="flex justify-between items-end">
      <div class="flex flex-col">
        <label for="char" class="uppercase text-[#97a0a5] font-bold text-sm mb-2">Character</label>
        <input
          name="char"
          class="border rounded border-altar-input px-2 py-3 w-28"
          type="text"
          placeholder="Character"
        >
      </div>
      <div>clock</div>
      <button
        class="bg-altar-button text-white uppercase font-medium py-2 px-4 rounded h-12"
        @click="generateGrid"
      >
        Generate 2D Grid
      </button>
    </div>
    <div class="mt-16">
      <Grid :grid="grid" />
    </div>
    <div class="mt-12">
      <GridCode :live="live" :code="code" />
    </div>
  </main>
</template>

<style scoped></style>
