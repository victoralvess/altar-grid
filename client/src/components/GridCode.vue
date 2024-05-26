<template>
    <div class="uppercase text-[#444] text-center">
        <div
            class="rounded-full w-3 h-3 inline-block mr-2"
            :class="live ? 'bg-[#ee545a]' : 'bg-[#8a9da4]'">
        </div>
        <span class="font-bold">{{ live ? 'live' : 'off' }}</span>
        <div class="border border-[#3f3f3f] rounded py-3 text-center w-[200px] mx-auto mt-1">
            <span class="uppercase">Your code:</span>&nbsp;<span class="font-bold">{{  code || '??' }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{ live?: boolean, code?: string }>();
</script>