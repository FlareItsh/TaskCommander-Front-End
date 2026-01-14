<script setup lang="ts">
    import { computed } from 'vue'

    interface Props {
        variant?: 'default' | 'secondary' | 'outline' | 'destructive' | 'ghost' | 'link'
        size?: 'sm' | 'default' | 'lg' | 'link'
        disabled?: boolean
        type?: 'button' | 'submit' | 'reset'
    }

    const props = withDefaults(defineProps<Props>(), {
        variant: 'default',
        size: 'default',
        disabled: false,
        type: 'button',
    })

    const variantClasses = {
        default: 'bg-primary rounded-lg px-4 py-2.5 text-[#000e0e] transition hover:opacity-90',
        secondary:
            'bg-secondary rounded-radius px-4 py-2.5 text-secondary-foreground transition hover:opacity-90',
        destructive:
            'bg-destructive rounded-radius px-4 py-2.5 text-destructive-foreground transition hover:opacity-90',
        outline:
            'border-border text-foreground hover:bg-accent rounded-radius border bg-transparent px-4 py-2.5 transition',
        ghost: 'hover:bg-accent text-foreground',
        link: 'text-primary-dark underline-offset-4 hover:underline',
    }

    const sizeClasses = {
        sm: 'h-8 rounded-md px-3 text-xs',
        default: 'h-auto px-4 py-2.5',
        lg: 'h-12 rounded-lg px-8',
        link: 'h-auto px-0',
    }

    const buttonClass = computed(() => {
        const base =
            'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50'
        return `${base} ${variantClasses[props.variant]} ${sizeClasses[props.size]}`
    })
</script>

<template>
    <button
        :class="buttonClass"
        :disabled="disabled"
        :type="type"
    >
        <slot />
    </button>
</template>
