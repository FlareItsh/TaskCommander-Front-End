<script setup lang="ts">
    //logics here
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

    const toggleTheme = () => {
        isDark.value = !isDark.value

        if (isDark.value) {
            document.documentElement.classList.add('dark')
            localStorage.setItem('theme', 'dark')
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('theme', 'light')
        }
    }
</script>

<template>
    <div
        class="border-sidebar-border flex h-16 w-full items-center justify-end border border-l-transparent px-8"
    >
        <div>
            <!-- Theme Switch -->
            <button
                class="hover:bg-sidebar-accent flex h-10 w-10 items-center justify-center rounded bg-transparent p-1 transition-colors"
                :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
                @click="toggleTheme"
            >
                <Transition
                    name="icon"
                    mode="out-in"
                >
                    <Icon
                        v-if="isDark"
                        key="moon"
                        name="lucide:moon"
                        class="text-xl"
                    />
                    <Icon
                        v-else
                        key="sun"
                        name="lucide:sun"
                        class="text-xl"
                    />
                </Transition>
            </button>
        </div>
    </div>
</template>
