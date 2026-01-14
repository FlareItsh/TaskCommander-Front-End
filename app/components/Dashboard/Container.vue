<script setup lang="ts">
    const props = defineProps({
        title: {
            type: String,
            required: false,
            default: 'Container Title',
        },
        subtitle: {
            type: String,
            required: false,
            default: 'Container Subtitle',
        },
        color: {
            type: String,
            required: false,
            default: 'blue',
        },
        value: {
            type: [String, Number],
            required: false,
            default: '0',
        },
        icon: {
            type: String,
            required: false,
            default: 'lucide:component',
        },
    })
</script>

<template>
    <div class="bg-card space-y-4 rounded-lg border p-4 shadow-sm">
        <div class="flex items-center justify-between">
            <AppBadge
                :color="props.color as any"
                :icon="props.icon"
                size="md"
                rounded="lg"
            />
            <AppBadge
                :color="props.color as any"
                :label="props.title"
                size="sm"
                rounded="sm"
            />
        </div>
        <span>
            <h2 class="text-card-foreground text-center text-4xl font-bold">{{ props.value }}</h2>
            <p class="text-muted-foreground mt-4 text-xs">{{ props.subtitle }}</p>
        </span>
    </div>
</template>
