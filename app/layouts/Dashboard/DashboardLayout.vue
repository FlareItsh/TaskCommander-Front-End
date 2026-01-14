<script setup lang="ts">
    // Dashboard layout logic here
</script>

<template>
    <div class="bg-background flex h-screen">
        <!-- Sidebar & Navbar-->
        <DashboardSidebar />

        <!-- Main Content -->
        <main class="flex-1 overflow-auto">
            <DashboardNavbar />
            <div class="p-4">
                <slot />
            </div>
        </main>
    </div>
</template>
