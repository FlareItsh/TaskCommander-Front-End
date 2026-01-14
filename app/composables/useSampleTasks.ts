import { ref } from 'vue'

export type Category = 'Work' | 'School' | 'Shopping' | 'Health' | 'Personal' | 'Finance' | 'Home'

export type Task = {
    id: string
    title: string
    description?: string
    dueDate: string // ISO string
    completed: boolean
    status: 'Completed' | 'Upcoming' | 'Overdue'
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
        status: 'Upcoming',
        priority: 'high',
        category: 'Work',
        tags: ['work', 'urgent'],
    },
    {
        id: '13',
        title: 'Submit Expense Report',
        description: 'Monthly business expenses for December.',
        dueDate: '2026-01-05T09:00:00.000Z',
        completed: false,
        status: 'Overdue',
        priority: 'high',
        category: 'Work',
        tags: ['finance', 'admin'],
    },
    {
        id: '2',
        title: 'Grocery shopping',
        description: 'Buy weekly groceries and snacks.',
        dueDate: '2026-01-15T12:00:00.000Z',
        completed: false,
        status: 'Upcoming',
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
        status: 'Upcoming',
        priority: 'low',
        category: 'Work',
        tags: ['work', 'meeting'],
    },
    {
        id: '14',
        title: 'Dentist Appointment',
        description: 'Regular checkup and cleaning.',
        dueDate: '2026-01-10T14:00:00.000Z',
        completed: true,
        status: 'Completed',
        priority: 'medium',
        category: 'Health',
        tags: ['health'],
    },
    {
        id: '4',
        title: 'Pay electricity bill',
        description: 'Pay before late fee is applied.',
        dueDate: '2026-01-10T23:59:00.000Z',
        completed: true,
        status: 'Completed',
        priority: 'high',
        category: 'Finance',
        tags: ['personal', 'finance'],
    },
    {
        id: '15',
        title: 'Buy Birthday Gift',
        description: 'Get something special for Sarah.',
        dueDate: '2026-01-12T18:00:00.000Z',
        completed: false,
        status: 'Overdue',
        priority: 'medium',
        category: 'Shopping',
        tags: ['gift'],
    },
    {
        id: '16',
        title: 'Math Assignment',
        description: 'Complete calculus problems 1-20.',
        dueDate: '2026-01-18T23:59:00.000Z',
        completed: false,
        status: 'Upcoming',
        priority: 'high',
        category: 'School',
        tags: ['homework'],
    },
    {
        id: '5',
        title: 'Read new design guidelines',
        description: 'Review updated design system docs.',
        dueDate: '2026-02-05T16:00:00.000Z',
        completed: false,
        status: 'Upcoming',
        priority: 'low',
        category: 'Work',
        tags: ['work', 'design'],
    },
    {
        id: '17',
        title: 'Fix Kitchen Sink',
        description: 'Repair the leaking faucet in the kitchen.',
        dueDate: '2026-01-08T10:00:00.000Z',
        completed: false,
        status: 'Overdue',
        priority: 'medium',
        category: 'Home',
        tags: ['repair'],
    },
    {
        id: '18',
        title: 'Daily Workout',
        description: '30-minute cardio and stretching.',
        dueDate: '2026-01-14T08:00:00.000Z',
        completed: true,
        status: 'Completed',
        priority: 'medium',
        category: 'Health',
        tags: ['fitness'],
    },
    {
        id: '19',
        title: 'Call Insurance Agent',
        description: 'Discuss renewal options for car insurance.',
        dueDate: '2026-01-16T15:30:00.000Z',
        completed: false,
        status: 'Upcoming',
        priority: 'low',
        category: 'Finance',
        tags: ['calls'],
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
            status: task.status || 'Upcoming',
            priority: task.priority || 'medium',
            category: task.category || 'Personal',
            tags: task.tags || [],
        }
        tasks.value.push(newTask)
        return newTask
    }
    return { tasks, raw, addTask }
}
