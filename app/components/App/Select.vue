<script setup lang="ts">
    import { ref, provide, onMounted, onUnmounted } from 'vue'

    interface Props {
        modelValue?: any
        placeholder?: string
        icon?: string
    }

    const props = withDefaults(defineProps<Props>(), {
        placeholder: 'Select an option',
        icon: 'lucide:chevron-down',
    })

    const emit = defineEmits(['update:modelValue', 'change'])

    const isOpen = ref(false)
    const containerRef = ref<HTMLElement | null>(null)
    const selectedLabel = ref('')

    const toggle = () => (isOpen.value = !isOpen.value)
    const close = () => (isOpen.value = false)

    const selectOption = (value: any, label: string) => {
        emit('update:modelValue', value)
        emit('change', value)
        selectedLabel.value = label
        close()
    }

    provide('selectContext', {
        modelValue: props.modelValue,
        selectOption,
        close,
    })

    const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.value && !containerRef.value.contains(event.target as Node)) {
            close()
        }
    }

    onMounted(() => {
        document.addEventListener('click', handleClickOutside)
    })

    onUnmounted(() => {
        document.removeEventListener('click', handleClickOutside)
    })
</script>

<template>
    <div
        ref="containerRef"
        class="relative inline-block w-full min-w-[150px]"
    >
        <button
            type="button"
            @click="toggle"
            class="focus:ring-primary bg-background flex w-full items-center justify-between rounded-md border px-3 py-2 text-base focus:ring-1 focus:outline-none"
        >
            <span :class="{ 'text-muted-foreground': !modelValue }">
                {{ selectedLabel || placeholder }}
            </span>
            <Icon
                :name="icon"
                class="ml-2 transition-transform duration-200"
                :class="{ 'rotate-180': isOpen }"
            />
        </button>

        <Transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
        >
            <div
                v-if="isOpen"
                class="bg-background custom-scrollbar absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border py-1 shadow-lg focus:outline-none"
            >
                <slot />
            </div>
        </Transition>
    </div>
</template>
