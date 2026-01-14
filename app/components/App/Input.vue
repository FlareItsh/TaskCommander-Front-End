<script setup lang="ts">
    interface Props {
        modelValue?: string | number
        label?: string
        placeholder?: string
        icon?: string
        type?: string
        size?: 'sm' | 'md' | 'lg'
    }

    const props = withDefaults(defineProps<Props>(), {
        modelValue: '',
        placeholder: 'Placeholder here',
        type: 'text',
        size: 'md',
    })

    const emit = defineEmits(['update:modelValue'])

    const sizeClasses = {
        sm: 'py-1.5 px-3 pl-9 text-sm rounded-md',
        md: 'py-2 px-3 pl-10 text-base rounded-lg',
        lg: 'py-3 px-4 pl-12 text-lg rounded-xl',
    }

    const iconSizeClasses = {
        sm: 'text-lg pl-2.5',
        md: 'text-xl pl-3',
        lg: 'text-2xl pl-3.5',
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
                :type="type"
                :value="modelValue"
                @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
                :placeholder="placeholder"
                class="focus:ring-primary/20 bg-background text-foreground w-full border transition-all duration-200 focus:ring-4 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                :class="[sizeClasses[size], icon ? '' : 'pl-3']"
            />
        </div>
    </div>
</template>

<style scoped>
    input::selection {
        background-color: color-mix(in srgb, var(--color-primary) 40%, transparent);
        color: var(--color-accent-foreground);
    }
</style>
