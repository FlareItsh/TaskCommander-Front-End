<script setup lang="ts">
    //logics here
    definePageMeta({
        layout: 'dashboard-layout',
    })

    const categories = ['Work', 'School', 'Shopping', 'Health', 'Personal', 'Finance', 'Home']
    const selectedCategory = ref('')
    const selectedStatus = ref('All Task')

    import { computed } from 'vue'
    import { useSampleTasks, type Task } from '../../composables/useSampleTasks'

    const { tasks } = useSampleTasks()

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

    const filteredTasks = computed(() => {
        let result = [...tasks.value]

        // Filter by status
        if (selectedStatus.value !== 'All Task') {
            result = result.filter((t) => {
                if (selectedStatus.value === 'Completed') return t.status === 'Completed'
                if (selectedStatus.value === 'Overdue') return t.status === 'Overdue'
                if (selectedStatus.value === 'Upcoming') return t.status === 'Upcoming'
                return true
            })
        }

        // Filter by category
        if (selectedCategory.value) {
            result = result.filter((t) => t.category === selectedCategory.value)
        }

        // Sort: Uncompleted first, then by due date
        return result.sort((a, b) => {
            // Priority 1: Completed status (false < true)
            if (a.completed !== b.completed) {
                return a.completed ? 1 : -1
            }

            // Priority 2: Due date (earlier dates first)
            return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        })
    })

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Completed':
                return 'green'
            case 'Upcoming':
                return 'yellow'
            case 'Overdue':
                return 'red'
            default:
                return 'blue'
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

    const formatDate = (iso: string) => {
        const d = new Date(iso)
        return d.toLocaleString(undefined, {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    const toggle = (task: any) => {
        const now = new Date()
        if (task.completed) {
            task.status = 'Completed'
        } else {
            const due = new Date(task.dueDate)
            task.status = due < now ? 'Overdue' : 'Upcoming'
        }
    }
</script>

<template>
    <div class="space-y-4">
        <div class="flex items-center justify-between">
            <AppHeading
                title="Tasks"
                subtitle="Manage all your tasks in one place."
                size="sm"
            />
            <AppButton>
                <Icon
                    name="tabler:plus"
                    class="mr-1"
                />
                Add Task
            </AppButton>
        </div>

        <hr />

        <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div class="flex flex-wrap items-center gap-2">
                <AppButton
                    :variant="selectedStatus === 'All Task' ? 'default' : 'secondary'"
                    @click="selectedStatus = 'All Task'"
                >
                    All Task
                </AppButton>
                <AppButton
                    :variant="selectedStatus === 'Completed' ? 'default' : 'secondary'"
                    @click="selectedStatus = 'Completed'"
                >
                    Completed
                </AppButton>
                <AppButton
                    :variant="selectedStatus === 'Overdue' ? 'default' : 'secondary'"
                    @click="selectedStatus = 'Overdue'"
                >
                    Overdue
                </AppButton>
                <AppButton
                    :variant="selectedStatus === 'Upcoming' ? 'default' : 'secondary'"
                    @click="selectedStatus = 'Upcoming'"
                >
                    Upcoming
                </AppButton>
            </div>
            <div class="flex items-center gap-2">
                <div class="w-full sm:w-48">
                    <AppSelect
                        v-model="selectedCategory"
                        placeholder="All Categories"
                    >
                        <AppSelectOption
                            value=""
                            label="All Categories"
                        />
                        <AppSelectOption
                            v-for="category in categories"
                            :key="category"
                            :value="category"
                            :label="category"
                        />
                    </AppSelect>
                </div>
                <div class="w-full">
                    <AppInput
                        icon="lucide:search"
                        placeholder="Search tasks..."
                        size="md"
                    />
                </div>
            </div>
        </div>

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

        <div
            class="bg-secondary text-muted-foreground flex items-center justify-between px-4 py-2 font-semibold uppercase"
        >
            <div class="flex flex-2 items-center gap-4">
                <span class="w-5"><!--Checkbox Space--></span>
                <span>Task Name</span>
            </div>
            <span class="flex-1 text-end">Category</span>
            <span class="flex-1 text-end">Due Date</span>
            <span class="flex-1 text-end">Status</span>
            <span class="flex-1"><!--Placeholder span to give space to actions--></span>
        </div>
        <div>
            <span class="text-muted-foreground text-sm font-medium">
                {{ selectedStatus }} - ({{ filteredTasks.length }})
            </span>
        </div>
        <div class="flex flex-col gap-2">
            <AppContainer
                v-for="task in filteredTasks"
                :key="task.id"
                class="group hover:bg-muted/50 flex items-center justify-between border-b px-4 py-3 transition-colors last:border-0"
            >
                <div class="flex flex-2 items-center gap-4">
                    <input
                        type="checkbox"
                        v-model="task.completed"
                        class="accent-primary h-5 w-5 cursor-pointer rounded border-gray-300 transition-colors"
                        @change="toggle(task)"
                    />
                    <span
                        class="font-medium transition-all"
                        :class="{ 'text-muted-foreground line-through': task.completed }"
                    >
                        {{ task.title }}
                    </span>
                </div>
                <div class="flex-1 text-end">
                    <AppBadge
                        v-if="task.category"
                        :label="task.category"
                        :color="getCategoryColor(task.category)"
                        variant="outline"
                        size="xs"
                    />
                </div>
                <span class="text-muted-foreground flex-1 text-end">{{
                    formatDate(task.dueDate)
                }}</span>
                <div class="flex-1 text-end">
                    <AppBadge
                        :label="task.status"
                        :color="getStatusColor(task.status)"
                        variant="soft"
                    />
                </div>
                <div
                    class="flex flex-1 justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100"
                >
                    <AppButton
                        variant="ghost"
                        size="sm"
                    >
                        <Icon
                            name="material-symbols:edit-square-outline"
                            class="text-xl"
                        />
                    </AppButton>
                    <AppButton
                        variant="ghost"
                        size="sm"
                        class="text-destructive hover:bg-destructive/10"
                    >
                        <Icon
                            name="material-symbols:delete-outline"
                            class="text-xl"
                        />
                    </AppButton>
                </div>
            </AppContainer>
            <div
                v-if="filteredTasks.length === 0"
                class="text-muted-foreground py-10 text-center"
            >
                No tasks found for the selected status.
            </div>
        </div>
    </div>
</template>
