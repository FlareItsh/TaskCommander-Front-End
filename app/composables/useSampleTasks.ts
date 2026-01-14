import { ref } from 'vue'

export type Category = 'Work' | 'School' | 'Shopping' | 'Health' | 'Personal' | 'Finance' | 'Home'

export type Task = {
    id: string
    title: string
    description?: string
    dueDate: string // ISO string
    completed: boolean
    priority?: 'low' | 'medium' | 'high'
    category?: Category
    tags?: string[]
}

const sampleTasks: Task[] = [
    {
        id: '1',
        title: 'Finish project proposal',
        description: 'Write final draft and send to the team for review.',
        dueDate: '2026-01-20T17:00:00.000Z',
        completed: false,
        priority: 'high',
        category: 'Work',
        tags: ['work', 'urgent'],
    },
    {
        id: '2',
        title: 'Grocery shopping',
        description: 'Buy weekly groceries and snacks.',
        dueDate: '2026-01-15T12:00:00.000Z',
        completed: false,
        priority: 'medium',
        category: 'Shopping',
        tags: ['personal'],
    },
    {
        id: '3',
        title: 'Team retro meeting',
        description: 'Prepare talking points and metrics to share.',
        dueDate: '2026-01-25T09:00:00.000Z',
        completed: false,
        priority: 'low',
        category: 'Work',
        tags: ['work', 'meeting'],
    },
    {
        id: '4',
        title: 'Pay electricity bill',
        description: 'Pay before late fee is applied.',
        dueDate: '2026-01-10T23:59:00.000Z',
        completed: true,
        priority: 'high',
        category: 'Finance',
        tags: ['personal', 'finance'],
    },
    {
        id: '5',
        title: 'Read new design guidelines',
        description: 'Review updated design system docs.',
        dueDate: '2026-02-05T16:00:00.000Z',
        completed: false,
        priority: 'low',
        category: 'Work',
        tags: ['work', 'design'],
    },
]

export const useSampleTasks = () => {
    const tasks = ref<Task[]>(sampleTasks.map((t) => ({ ...t })))
    const raw = () => JSON.parse(JSON.stringify(sampleTasks)) as Task[]
    const addTask = (task: Partial<Task>) => {
        const newTask: Task = {
            id: String(Date.now()),
            title: task.title || 'New Task',
            description: task.description || '',
            dueDate: task.dueDate || new Date().toISOString(),
            completed: task.completed ?? false,
            priority: task.priority || 'medium',
            category: task.category || 'Personal',
            tags: task.tags || [],
        }
        tasks.value.push(newTask)
        return newTask
    }
    return { tasks, raw, addTask }
}
