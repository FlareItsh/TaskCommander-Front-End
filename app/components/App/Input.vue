<script setup lang="ts">
    //logics here
    defineProps({
        label: {
            type: String,
            required: false,
            default: 'Label here',
        },
        placeholder: {
            type: String,
            required: false,
            default: 'Placeholder here',
        },
        icon: {
            type: String,
            required: false,
            default: 'lucide:component',
        },
    })
</script>

<template>
    <div class="mb-4">
        <label class="mb-2 block text-sm font-medium text-gray-700"> {{ label }} </label>
        <div class="relative">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Icon
                    :name="icon"
                    class="text-foreground/90 text-xl"
                />
            </div>
            <input
                type="text"
                :placeholder="placeholder"
                class="focus:border-ring focus:ring-ring focus:ring-0.5 w-full rounded-lg border py-2 pr-3 pl-10 focus:outline-none"
            />
        </div>
    </div>
</template>

<style scoped>
    /* Text selection colors using primary color with opacity */
    input::selection {
        background-color: color-mix(in srgb, var(--color-primary) 40%, transparent);
        color: var(--color-accent-foreground);
    }
</style>
