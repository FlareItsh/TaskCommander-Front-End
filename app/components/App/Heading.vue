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
        size: {
            type: String as () => 'md' | 'sm',
            default: 'md',
        },
    })
</script>

<template>
    <div class="mb-4 space-y-2">
        <h2
            class="font-secondary font-bold"
            :class="[size === 'sm' ? 'text-xl' : 'text-3xl']"
        >
            {{ title }}
        </h2>
        <p
            class="text-muted-foreground"
            :class="[size === 'sm' ? 'text-sm' : 'text-base']"
        >
            {{ subtitle }}
        </p>
    </div>
</template>
