<script setup lang="ts">
    import { inject, computed } from 'vue'

    interface Props {
        value: any
        label?: string
    }

    const props = defineProps<Props>()

    const context = inject<{
        modelValue: any
        selectOption: (value: any, label: string) => void
    }>('selectContext')

    const isSelected = computed(() => context?.modelValue === props.value)

    const handleClick = () => {
        if (context) {
            context.selectOption(props.value, props.label || String(props.value))
        }
    }
</script>

<template>
    <div
        @click="handleClick"
        class="hover:bg-muted/50 relative cursor-default px-3 py-2 text-sm transition-colors select-none"
        :class="[isSelected ? 'bg-primary/10 text-primary font-medium' : 'text-foreground']"
    >
        <slot>
            {{ label || value }}
        </slot>
        <div
            v-if="isSelected"
            class="absolute inset-y-0 right-0 flex items-center pr-3"
        >
            <Icon
                name="lucide:check"
                class="h-4 w-4"
            />
        </div>
    </div>
</template>
