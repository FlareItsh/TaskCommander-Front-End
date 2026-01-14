<script setup lang="ts">
    import { ref, computed } from 'vue'

    //logics here
    defineProps({
        label: {
            type: String,
            required: false,
            default: 'Label here',
        },
        icon: {
            type: String,
            required: false,
            default: 'lucide:lock',
        },
    })

    const isVisible = ref(false)

    const inputType = computed(() => (isVisible.value ? 'text' : 'password'))
    const eyeIcon = computed(() => (isVisible.value ? 'lucide:eye-off' : 'lucide:eye'))

    const toggleVisibility = () => {
        isVisible.value = !isVisible.value
    }
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
                :type="inputType"
                placeholder="••••••••"
                class="focus:border-ring focus:ring-ring focus:ring-0.5 w-full rounded-lg border py-2 pr-12 pl-10 focus:outline-none"
            />
            <button
                type="button"
                @click="toggleVisibility"
                class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
            >
                <Icon
                    :name="eyeIcon"
                    class="text-xl"
                />
            </button>
        </div>
    </div>
</template>

<style scoped>
    /* Text selection colors using primary color */
    input::selection {
        background-color: color-mix(in srgb, var(--color-primary) 40%, transparent);
        color: var(--color-accent-foreground);
    }
</style>
