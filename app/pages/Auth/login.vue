<script setup lang="ts">
    import App from '~/app.vue'

    definePageMeta({
        layout: false,
    })
</script>

<template>
    <NuxtLayout name="auth-split">
        <template #left>
            <div class="flex h-screen w-lg flex-col justify-center space-y-5 px-6 py-12">
                <AppNavTitle />
                <AppHeading
                    title="Welcome back!"
                    subtitle="Log in to continue commanding your tasks."
                />
                <form action="">
                    <AppInput
                        label="Email Address"
                        placeholder="you@example.com"
                        icon="lucide:mail"
                    />
                    <AppProtectedInput
                        label="Password"
                        placeholder="Enter your password"
                        icon="lucide:lock"
                    />
                    <NuxtLink to="/dashboard/main">
                        <AppButton class="mt-2 w-full font-bold shadow-lg">
                            Login
                            <Icon
                                name="lucide:arrow-right"
                                class="ml-2 h-4 w-4"
                            />
                        </AppButton>
                    </NuxtLink>
                </form>
                <p class="text-muted-foreground mt-10 text-center">
                    Don't have an account?
                    <NuxtLink to="/auth/signup">
                        <AppButton
                            variant="link"
                            size="link"
                            to=""
                        >
                            Create one
                        </AppButton>
                    </NuxtLink>
                </p>
            </div>
        </template>
        <template #right>
            <div class="hidden lg:block">
                <div>
                    <div class="mb-10 flex items-center justify-center">
                        <div class="flex items-center rounded-full bg-black">
                            <Icon
                                name="streamline-ultimate:command-button-keyboard-bold"
                                class="text-primary text-8xl"
                            />
                        </div>
                    </div>
                    <AppHeading
                        title="Take control of your day"
                        subtitle="Your command center awaits. Sign in to see what's urgent, what's next, and what's done."
                        class="w-md space-y-5 text-center"
                    />
                </div>
            </div>
        </template>
    </NuxtLayout>
</template>
