<template>
    <div class="flex items-center justify-center border border-altar-grid p-4 font-bold">{{ char || '' }}</div>
</template>

<script setup lang="ts">
defineProps<{ char?: string }>();
</script>

<style scoped></style>