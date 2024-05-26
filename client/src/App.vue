<script setup lang="ts">
import Grid from './components/Grid.vue'
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
      <button class="bg-altar-button text-white uppercase font-medium py-2 px-4 rounded h-12">Generate 2D Grid</button>
    </div>
    <div class="mt-16">
      <Grid />
    </div>
  </main>
</template>

<style scoped></style>
