<script setup lang="ts">
    // logics here
    const isDark = ref(false)

    onMounted(() => {
        // Check system preference or localStorage
        const savedTheme = localStorage.getItem('theme')
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            isDark.value = true
            document.documentElement.classList.add('dark')
        }
    })
</script>

<template>
    <div class="flex h-screen flex-col lg:flex-row">
        <div class="flex h-screen w-full items-center justify-center lg:w-1/2">
            <slot name="left" />
        </div>
        <div class="flex h-screen w-full items-center justify-center lg:w-1/2">
            <slot name="right" />
        </div>
    </div>
</template>
