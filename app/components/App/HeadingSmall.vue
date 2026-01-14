<script setup lang="ts">
    //logics here
    defineProps({
        title: {
            type: String,
            required: true,
        },
        subtitle: {
            type: String,
            required: false,
        },
    })
</script>

<template>
    <div class="mb-4 space-y-2">
        <h2 class="font-secondary text-xl font-bold">{{ title }}</h2>
        <p class="text-muted-foreground text-sm">{{ subtitle }}</p>
    </div>
</template>
