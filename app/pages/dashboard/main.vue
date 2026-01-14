<script setup lang="ts">
    definePageMeta({
        layout: 'dashboard-layout',
    })

    import { computed } from 'vue'
    import { useSampleTasks, type Task } from '../../composables/useSampleTasks'

    const { tasks } = useSampleTasks()

    const now = new Date()

    const upcomingTasks = computed(() =>
        tasks.value
            .filter(
                (t: Task) =>
                    !t.completed &&
                    new Date(t.dueDate) >= now &&
                    new Date(t.dueDate) <= new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
            )
            .sort((a: Task, b: Task) => +new Date(a.dueDate) - +new Date(b.dueDate)),
    )

    const recentTasks = computed(() =>
        tasks.value
            .slice()
            .sort((a: Task, b: Task) => +new Date(b.dueDate) - +new Date(a.dueDate))
            .slice(0, 5),
    )

    const toggle = (task: any) => {
        task.completed = !task.completed
    }

    const formatDate = (iso: string) => {
        const d = new Date(iso)
        return d.toLocaleString(undefined, {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    const getPriorityColor = (priority?: string) => {
        switch (priority?.toLowerCase()) {
            case 'high':
                return 'red'
            case 'medium':
                return 'yellow'
            default:
                return 'green'
        }
    }
</script>

<template>
    <div class="custom-scrollbar flex h-[calc(100vh-6rem)] flex-col">
        <AppHeadingSmall
            title="Dashboard"
            subtitle="Welcome back. Here's your command center."
        />
        <div class="flex min-h-0 flex-1 flex-col space-y-4">
            <div class="grid grid-cols-4 gap-4">
                <DashboardContainer
                    title="Total"
                    subtitle="All Tasks"
                    value="32"
                    icon="lucide:list-checks"
                    color="blue"
                />
                <DashboardContainer
                    title="Done"
                    subtitle="Completed Tasks"
                    value="24"
                    icon="material-symbols:check-circle"
                    color="green"
                />
                <DashboardContainer
                    title="Overdue"
                    subtitle="Need Attention"
                    value="8"
                    icon="si:warning-fill"
                    color="red"
                />
                <DashboardContainer
                    title="Upcoming"
                    subtitle="Due Soon"
                    value="12"
                    icon="lets-icons:time-fill"
                    color="yellow"
                />
            </div>

            <hr />

            <div class="grid min-h-0 flex-1 grid-cols-2 gap-4">
                <AppContainer>
                    <div class="flex items-center gap-2">
                        <Icon
                            name="lets-icons:time-fill"
                            class="text-2xl text-yellow-500"
                        />
                        <h2 class="font-secondary text-lg font-bold">Upcoming Pulse</h2>
                    </div>
                    <div>
                        <ul class="mt-4 space-y-3">
                            <li
                                v-for="task in upcomingTasks"
                                :key="task.id"
                                class="flex items-start gap-3"
                            >
                                <input
                                    type="checkbox"
                                    class="mt-1"
                                    v-model="task.completed"
                                    @change="toggle(task)"
                                />
                                <div>
                                    <div class="font-medium">{{ task.title }}</div>
                                    <div class="space-x-2 text-sm text-gray-500">
                                        <AppBadge
                                            v-if="task.category"
                                            color="blue"
                                            :label="task.category"
                                            variant="outline"
                                        />
                                        <AppBadge
                                            :color="getPriorityColor(task.priority)"
                                            :label="task.priority || 'Low'"
                                            variant="soft"
                                        />
                                        <span>
                                            {{ formatDate(task.dueDate) }}
                                        </span>
                                    </div>
                                </div>
                            </li>

                            <li
                                v-if="upcomingTasks.length === 0"
                                class="text-sm text-gray-500"
                            >
                                No upcoming tasks.
                            </li>
                        </ul>
                    </div>
                </AppContainer>

                <AppContainer>
                    <div class="flex items-center gap-2">
                        <Icon
                            name="lucide:list-checks"
                            class="text-2xl text-blue-500"
                        />
                        <h2 class="font-secondary text-lg font-bold">Recent Tasks</h2>
                    </div>
                    <div>
                        <ul class="mt-4 space-y-3">
                            <li
                                v-for="task in recentTasks"
                                :key="task.id"
                                class="flex items-start gap-3"
                            >
                                <input
                                    type="checkbox"
                                    class="mt-1"
                                    v-model="task.completed"
                                    @change="toggle(task)"
                                />
                                <div>
                                    <div class="font-medium">{{ task.title }}</div>
                                    <div class="space-x-2 text-sm text-gray-500">
                                        <AppBadge
                                            v-if="task.category"
                                            color="purple"
                                            :label="task.category"
                                            variant="outline"
                                        />
                                        <AppBadge
                                            :color="getPriorityColor(task.priority)"
                                            :label="task.priority || 'Low'"
                                            variant="soft"
                                        />
                                        <span>
                                            {{ formatDate(task.dueDate) }}
                                        </span>
                                    </div>
                                </div>
                            </li>
                            <li
                                v-if="recentTasks.length === 0"
                                class="text-sm text-gray-500"
                            >
                                No recent tasks.
                            </li>
                        </ul>
                    </div>
                </AppContainer>
            </div>
        </div>
    </div>
</template>
