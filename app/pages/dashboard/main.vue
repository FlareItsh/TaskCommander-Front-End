<script setup lang="ts">
    definePageMeta({
        layout: 'dashboard-layout',
    })

    import { computed } from 'vue'
    import { useSampleTasks, type Task } from '../../composables/useSampleTasks'

    const { tasks } = useSampleTasks()

    const now = new Date()

    const countTasks = computed(() => tasks.value.length)
    const countDoneTasks = computed(
        () => tasks.value.filter((t) => t.status === 'Completed').length,
    )
    const countOverdueTasks = computed(
        () => tasks.value.filter((t) => t.status === 'Overdue').length,
    )
    const countUpcomingTasks = computed(
        () => tasks.value.filter((t) => t.status === 'Upcoming').length,
    )

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
        [...tasks.value]
            .sort((a: Task, b: Task) => {
                // Priority 1: Completed status (false < true)
                if (a.completed !== b.completed) {
                    return a.completed ? 1 : -1
                }
                // Priority 2: Creation order (ID descending)
                // IDs are strings (timestamps or increments), numeric comparison is safest
                return Number(b.id) - Number(a.id)
            })
            .slice(0, 5),
    )

    const toggle = (task: any) => {
        // task.completed is already updated by v-model before this fires

        if (task.completed) {
            task.status = 'Completed'
        } else {
            // Re-calculate status if uncompleted
            const due = new Date(task.dueDate)
            task.status = due < now ? 'Overdue' : 'Upcoming'
        }
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

    const getCategoryColor = (category?: string) => {
        switch (category) {
            case 'Work':
                return 'blue'
            case 'School':
                return 'purple'
            case 'Shopping':
                return 'yellow'
            case 'Health':
                return 'green'
            case 'Finance':
                return 'primary'
            case 'Home':
                return 'red'
            default:
                return 'gray'
        }
    }
</script>

<template>
    <div class="flex h-[calc(100vh-6rem)] flex-col">
        <AppHeading
            title="Dashboard"
            subtitle="Welcome back. Here's your command center."
            size="sm"
        />
        <div class="flex min-h-0 flex-1 flex-col space-y-4">
            <div class="grid grid-cols-4 gap-4">
                <DashboardContainer
                    title="Total"
                    subtitle="All Tasks"
                    :value="String(countTasks)"
                    icon="lucide:list-checks"
                    color="blue"
                />
                <DashboardContainer
                    title="Done"
                    subtitle="Completed Tasks"
                    :value="String(countDoneTasks)"
                    icon="material-symbols:check-circle"
                    color="green"
                />
                <DashboardContainer
                    title="Overdue"
                    subtitle="Need Attention"
                    :value="String(countOverdueTasks)"
                    icon="si:warning-fill"
                    color="red"
                />
                <DashboardContainer
                    title="Upcoming"
                    subtitle="Due Soon"
                    :value="String(countUpcomingTasks)"
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
                                    class="accent-primary mt-1 h-5 w-5 cursor-pointer rounded"
                                    v-model="task.completed"
                                    @change="toggle(task)"
                                />
                                <div>
                                    <div class="font-medium">{{ task.title }}</div>
                                    <div
                                        class="flex flex-wrap items-center gap-2 text-sm text-gray-500"
                                    >
                                        <AppBadge
                                            v-if="task.category"
                                            :color="getCategoryColor(task.category)"
                                            :label="task.category"
                                            variant="outline"
                                            size="xs"
                                        />
                                        <AppBadge
                                            :color="getPriorityColor(task.priority)"
                                            :label="task.priority || 'Low'"
                                            variant="soft"
                                            size="xs"
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
                                    class="accent-primary mt-1 h-5 w-5 rounded"
                                    v-model="task.completed"
                                    @change="toggle(task)"
                                />
                                <div>
                                    <div
                                        class="font-medium transition-all"
                                        :class="{
                                            'text-muted-foreground line-through': task.completed,
                                        }"
                                    >
                                        {{ task.title }}
                                    </div>
                                    <div
                                        class="flex flex-wrap items-center gap-2 text-sm text-gray-500"
                                    >
                                        <AppBadge
                                            v-if="task.category"
                                            :color="getCategoryColor(task.category)"
                                            :label="task.category"
                                            variant="outline"
                                            size="xs"
                                        />
                                        <AppBadge
                                            :color="getPriorityColor(task.priority)"
                                            :label="task.priority || 'Low'"
                                            variant="soft"
                                            size="xs"
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
