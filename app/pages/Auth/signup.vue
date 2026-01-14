<script setup lang="ts">
    definePageMeta({
        layout: false,
    })
</script>

<template>
    <NuxtLayout name="auth-split">
        <template #left>
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
                        title="Join thousands of productive people"
                        subtitle="Stop drowning in to-do lists. Start commanding your tasks with clarity and focus."
                        class="w-md space-y-5 text-center"
                    />
                </div>
            </div>
        </template>
        <template #right>
            <div class="flex h-screen w-lg flex-col justify-center space-y-5 px-6 py-12">
                <AppNavTitle />
                <AppHeading
                    title="Create your account"
                    subtitle="Start commanding your tasks in less than a minute"
                />

                <form action="">
                    <AppInput
                        label="Full Name"
                        placeholder="John Doe"
                        icon="lucide:user"
                    />
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
                    <AppProtectedInput
                        label="Confirm Password"
                        placeholder="Confirm your password"
                        icon="lucide:lock"
                    />

                    <AppButton class="mt-2 w-full font-bold shadow-lg">
                        Create Account
                        <Icon
                            name="lucide:arrow-right"
                            class="ml-2 h-4 w-4"
                        />
                    </AppButton>
                </form>

                <p class="text-muted-foreground mt-10 text-center">
                    Already have an account?
                    <NuxtLink to="/auth/login">
                        <AppButton
                            variant="link"
                            size="link"
                        >
                            Log in
                        </AppButton>
                    </NuxtLink>
                </p>
            </div>
        </template>
    </NuxtLayout>
</template>
