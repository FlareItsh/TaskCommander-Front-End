<script setup lang="ts">
    import { ref, computed } from 'vue'

    interface NavItem {
        label: string
        href: string
        icon: string
    }

    const navItems: NavItem[] = [
        { label: 'Dashboard', href: '/dashboard/main', icon: 'lucide:layout-dashboard' },
        { label: 'Tasks', href: '/dashboard/tasks', icon: 'lucide:check-circle' },
        { label: 'Settings', href: '/dashboard/settings', icon: 'lucide:settings' },
    ]

    const isCollapsed = ref(false)

    const toggleSidebar = () => {
        isCollapsed.value = !isCollapsed.value
    }

    const route = useRoute()
    const currentRoute = computed(() => route.path)

    const isActive = (href: string) => {
        return currentRoute.value === href || currentRoute.value.startsWith(href + '/')
    }
</script>

<template>
    <aside
        :class="[
            'bg-sidebar border-sidebar-border flex h-full flex-col border-r transition-all duration-300',
            isCollapsed ? 'w-20' : 'w-64',
        ]"
    >
        <!-- Header -->
        <div class="border-sidebar-border flex h-16 items-center justify-between border-b px-4">
            <div
                v-if="!isCollapsed"
                class="flex items-center space-x-2"
            >
                <AppNavTitle class="w-20 scale-80" />
            </div>

            <div
                v-else
                class="m-2 flex items-center justify-center"
            >
                <div class="flex items-center rounded-lg bg-black">
                    <Icon
                        name="streamline-ultimate:command-button-keyboard-bold"
                        class="text-primary text-2xl"
                    />
                </div>
            </div>

            <button
                @click="toggleSidebar"
                class="text-sidebar-foreground hover:bg-sidebar-accent flex h-8 w-8 items-center justify-center rounded transition-colors"
                :aria-label="isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'"
            >
                <Icon
                    :name="isCollapsed ? 'mdi:chevron-right' : 'mdi:chevron-left'"
                    class="text-xl"
                />
            </button>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 space-y-1 p-4">
            <NuxtLink
                v-for="item in navItems"
                :key="item.href"
                :to="item.href"
                :class="[
                    'flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive(item.href)
                        ? 'bg-sidebar-accent text-sidebar-foreground'
                        : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                ]"
            >
                <span class="text-lg"><Icon :name="item.icon" /></span>
                <span
                    v-if="!isCollapsed"
                    class="truncate"
                >
                    {{ item.label }}
                </span>
            </NuxtLink>
        </nav>

        <!-- Footer -->
        <div class="border-sidebar-border border-t p-4">
            <button
                v-if="!isCollapsed"
                class="text-sidebar-foreground hover:bg-sidebar-accent flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
            >
                <span class="text-lg"><Icon name="lucide:log-out" /></span>
                <span>Logout</span>
            </button>
            <button
                v-else
                class="text-sidebar-foreground hover:bg-sidebar-accent flex w-full items-center justify-center rounded-lg px-3 py-2 text-sm font-medium transition-colors"
                title="Logout"
            >
                <span class="text-lg"><Icon name="lucide:log-out" /></span>
            </button>
        </div>
    </aside>
</template>
