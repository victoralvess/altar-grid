<script setup lang="ts">
import { onUnmounted, ref } from 'vue';
import Grid from './components/Grid.vue';
import GridCode from './components/GridCode.vue';
import axios from 'axios';

const BFF_API_URL = 'http://localhost:3000';
const axiosClient = axios.create({ baseURL: BFF_API_URL });

const grid = ref<string[][]>([]);
const code = ref<string | undefined>();
const live = ref<boolean>(false);
const bias = ref<string>('');

const fetchGrid = async () => {
  try {
    const gridResponse = await axiosClient.get('grid', { params: { bias: bias.value } });
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

const fetchGridAndCode = async () => {
  await fetchGrid();
  await fetchCode();
}

const gridInterval = ref<number | undefined>();
const generateGrid = () => {
  if (gridInterval.value) {
    return;
  }

  live.value = true;
  
  fetchGridAndCode(); // fetch immediately
  gridInterval.value = setInterval(fetchGridAndCode, 2000);
}

const biasTimeout = ref<boolean>(false);
const biasError = ref<string | null>(null);

const onBiasInput = () => {
  if (bias.value === '') {
    biasError.value = null;
  }
}

const biasCounter = ref<number>(0);
const biasCounterTimeout = ref<number | undefined>();

const onBiasKeyPress = async (event: KeyboardEvent) => {
  const valid = /^[a-z]$/.test(event.key);
  
  if (biasTimeout.value) {
    biasError.value = 'Timeout error';
    event.preventDefault();
    return;
  }

  if (bias.value.length > 0) {
    biasError.value = 'Only a single character is allowed';
    event.preventDefault();
    return;
  }

  if (!valid) {
    biasError.value = 'Character must be a lowercase letter';
    event.preventDefault();
    return;
  }

  biasError.value = null;
  biasTimeout.value = true;

  await new Promise<void>((resolve) => {
    clearTimeout(biasCounterTimeout.value);
    biasCounter.value = 4;
    biasCounterTimeout.value = setInterval(() => { biasCounter.value--; }, 1000);

    setTimeout(() => {
      biasTimeout.value = false;
      biasError.value = null;
      resolve();
    }, 4000);
  });
}

onUnmounted(() => {
  clearInterval(gridInterval.value)
});
</script>

<template>
  <main class="w-100 max-w-screen-md mx-auto mt-8">
    <div class="flex justify-between items-end">
      <div class="flex flex-col relative">
        <label for="char" class="uppercase text-[#97a0a5] font-bold text-sm mb-2">Character</label>
        <input
          name="char"
          class="border rounded border-altar-input px-2 py-3 w-28"
          type="text"
          placeholder="Character"
          v-model="bias"
          @input="onBiasInput"
          @keypress="onBiasKeyPress"
        >
        <small
          v-if="biasError"
          class="absolute bottom-[-20px] left-0 text-red-500 w-[400px]"
        >
          {{ biasTimeout ? `You must wait for another ${biasCounter} seconds` : biasError }}
        </small>
      </div>
      <div>
        <img src="./assets/clock.png" alt="clock" width="48">
      </div>
      <button
        class="bg-altar-button text-white uppercase font-medium py-2 px-6 rounded h-11 tracking-wider"
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
