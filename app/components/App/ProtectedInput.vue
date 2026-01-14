<script setup lang="ts">
    import { ref, computed } from 'vue'

    interface Props {
        modelValue?: string | number
        label?: string
        placeholder?: string
        icon?: string
        size?: 'sm' | 'md' | 'lg'
    }

    const props = withDefaults(defineProps<Props>(), {
        modelValue: '',
        placeholder: '••••••••',
        icon: 'lucide:lock',
        size: 'md',
    })

    const emit = defineEmits(['update:modelValue'])

    const isVisible = ref(false)
    const inputType = computed(() => (isVisible.value ? 'text' : 'password'))
    const eyeIcon = computed(() => (isVisible.value ? 'lucide:eye-off' : 'lucide:eye'))

    const toggleVisibility = () => {
        isVisible.value = !isVisible.value
    }

    const sizeClasses = {
        sm: 'py-1.5 px-3 pl-9 pr-10 text-sm rounded-md',
        md: 'py-2 px-3 pl-10 pr-12 text-base rounded-lg',
        lg: 'py-3 px-4 pl-12 pr-14 text-lg rounded-xl',
    }

    const iconSizeClasses = {
        sm: 'text-lg pl-2.5',
        md: 'text-xl pl-3',
        lg: 'text-2xl pl-3.5',
    }

    const toggleSizeClasses = {
        sm: 'pr-2.5 text-lg',
        md: 'pr-3 text-xl',
        lg: 'pr-4 text-2xl',
    }
</script>

<template>
    <div class="w-full">
        <label
            v-if="label"
            class="text-muted-foreground mb-2 block text-sm font-medium"
        >
            {{ label }}
        </label>
        <div class="relative flex items-center">
            <div
                v-if="icon"
                class="pointer-events-none absolute inset-y-0 left-0 flex items-center"
                :class="iconSizeClasses[size]"
            >
                <Icon
                    :name="icon"
                    class="text-muted-foreground transition-colors"
                />
            </div>
            <input
                :type="inputType"
                :value="modelValue"
                @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
                :placeholder="placeholder"
                class="focus:ring-primary/20 bg-background text-foreground w-full border transition-all duration-200 focus:ring-4 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                :class="[sizeClasses[size], icon ? '' : 'pl-3']"
            />
            <button
                type="button"
                @click="toggleVisibility"
                class="text-muted-foreground hover:text-foreground absolute inset-y-0 right-0 flex items-center transition-colors"
                :class="toggleSizeClasses[size]"
            >
                <Icon :name="eyeIcon" />
            </button>
        </div>
    </div>
</template>

<style scoped>
    input::selection {
        background-color: color-mix(in srgb, var(--color-primary) 40%, transparent);
        color: var(--color-accent-foreground);
    }
</style>
