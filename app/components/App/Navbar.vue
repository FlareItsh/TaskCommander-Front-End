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
    <nav
        class="bg-background/80 border-border fixed top-0 right-0 left-0 z-50 border-b backdrop-blur-md"
    >
        <div class="container mx-auto flex h-16 items-center justify-between px-4">
            <AppNavTitle />
            <ul class="text-muted-foreground hidden items-center space-x-10 md:flex">
                <li><NuxtLink>Features</NuxtLink></li>
                <li><NuxtLink>How it Works</NuxtLink></li>
                <li><NuxtLink>Why Us</NuxtLink></li>
            </ul>
            <div class="flex items-center space-x-5">
                <!-- Theme Switch -->
                <button
                    class="flex h-8 w-8 items-center justify-center rounded bg-transparent p-1 transition-colors"
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
                            class="h-4 w-4"
                        />
                        <Icon
                            v-else
                            key="sun"
                            name="lucide:sun"
                            class="h-4 w-4"
                        />
                    </Transition>
                </button>
                <NuxtLink to="/auth/login">
                    <AppButton
                        variant="ghost"
                        class="font-bold"
                    >
                        Sign In
                    </AppButton>
                </NuxtLink>
                <NuxtLink to="/auth/signup">
                    <AppButton class="font-bold shadow-lg"> Get Started </AppButton>
                </NuxtLink>
            </div>
        </div>
    </nav>
</template>
