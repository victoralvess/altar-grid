<template>
    <div>
        <div v-if="grid.length > 0">
            <div v-for="row in grid.length" :key="row" class="flex">
                <GridCell class="flex-1" v-for="char, col in grid[row - 1]" :key="char+col" :char="char" />
            </div>
        </div>
        <div v-else>
            <div v-for="row in GRID_SIZE" :key="row" class="flex">
                <GridCell class="flex-1" v-for="col in GRID_SIZE" :key="col" :char="''" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import GridCell from './GridCell.vue';

defineProps<{ grid: string[][] }>()

const GRID_SIZE = 10;
</script>

<style scoped></style>