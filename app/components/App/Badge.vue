<script setup lang="ts">
    interface Props {
        color?: 'red' | 'green' | 'yellow' | 'blue' | 'purple' | 'primary' | 'gray'
        variant?: 'soft' | 'solid' | 'outline'
        size?: 'xs' | 'sm' | 'md'
        rounded?: 'sm' | 'md' | 'lg' | 'full'
        label?: string
        icon?: string
    }

    const props = withDefaults(defineProps<Props>(), {
        color: 'blue',
        variant: 'soft',
        size: 'sm',
        rounded: 'full',
        label: '',
        icon: undefined,
    })

    const sizeClasses = {
        xs: 'px-2 py-0.25 text-[10px]',
        sm: 'px-2.5 py-0.5 text-xs',
        md: 'px-3 py-1 text-sm',
    }

    const roundedClasses = {
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-full',
    }

    const colorClasses = computed(() => {
        const variants = {
            red: {
                soft: 'bg-red-500/15 text-red-600 dark:text-red-400',
                solid: 'bg-red-600 text-white',
                outline: 'border border-red-500/50 text-red-600 dark:text-red-400',
            },
            green: {
                soft: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
                solid: 'bg-emerald-600 text-white',
                outline: 'border border-emerald-500/50 text-emerald-600 dark:text-emerald-400',
            },
            yellow: {
                soft: 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
                solid: 'bg-amber-600 text-white',
                outline: 'border border-amber-500/50 text-amber-600 dark:text-amber-400',
            },
            blue: {
                soft: 'bg-blue-500/15 text-blue-600 dark:text-blue-400',
                solid: 'bg-blue-600 text-white',
                outline: 'border border-blue-500/50 text-blue-600 dark:text-blue-400',
            },
            purple: {
                soft: 'bg-purple-500/15 text-purple-600 dark:text-purple-400',
                solid: 'bg-purple-600 text-white',
                outline: 'border border-purple-500/50 text-purple-600 dark:text-purple-400',
            },
            primary: {
                soft: 'bg-primary/15 text-primary-dark dark:text-primary-light',
                solid: 'bg-primary text-primary-foreground',
                outline: 'border border-primary/50 text-primary-dark dark:text-primary-light',
            },
            gray: {
                soft: 'bg-muted text-muted-foreground',
                solid: 'bg-muted-foreground text-muted',
                outline: 'border border-muted-foreground/30 text-muted-foreground',
            },
        }

        const colorSet = variants[props.color] || variants.blue
        return colorSet[props.variant] || colorSet.soft
    })
</script>

<template>
    <div
        :class="[
            'inline-flex shrink-0 items-center justify-center gap-1.5 font-medium transition-colors',
            sizeClasses[props.size],
            roundedClasses[props.rounded],
            colorClasses,
        ]"
    >
        <Icon
            v-if="props.icon"
            :name="props.icon"
            class="text-[1.1em]"
        />
        <slot>{{ label }}</slot>
    </div>
</template>
