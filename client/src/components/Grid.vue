<template>
    <div>
        <div v-for="row in GRID_SIZE" :key="row" class="flex">
            <GridCell class="flex-1" v-for="char, col in grid[row - 1]" :key="col" :char="char" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import GridCell from './GridCell.vue';

const GRID_SIZE = 10;
const grid = ref<string[][]>([]);

for (let i = 0; i < GRID_SIZE; i++) {
    grid.value.push(new Array(GRID_SIZE).fill(''));
}
</script>

<style scoped></style>