interface ITask {
    id: number;
    title: string;
    completed: boolean;
}

interface ITaskRepository {
    addTask(task: ITask): void;
    removeTask(taskId: number): void;
    getTasks(): ITask[];
    getTaskById(taskId: number): ITask | undefined;
}

interface ITaskService {
    createTask(title: string): ITask;
    completeTask(taskId: number): void;
    getPendingTasks(): ITask[];
}

class TaskRepository implements ITaskRepository {
    private tasks: ITask[] = [];

    public addTask(task: ITask): void {
        this.tasks.push(task);
    }

    public removeTask(taskId: number): void {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
    }

    public getTasks(): ITask[] {
        return this.tasks;
    }

    public getTaskById(taskId: number): ITask | undefined {
        return this.tasks.find(task => task.id === taskId);
    }
}

class TaskService implements ITaskService {
    private taskRepository: ITaskRepository;

    constructor(taskRepository: ITaskRepository) {
        this.taskRepository = taskRepository;
    }

    public createTask(title: string): ITask {
        const task: ITask = { id: Date.now(), title, completed: false };
        this.taskRepository.addTask(task);
        return task;
    }

    public completeTask(taskId: number): void {
        const task = this.taskRepository.getTaskById(taskId);
        if (task) {
            task.completed = true;
        }
    }

    public getPendingTasks(): ITask[] {
        return this.taskRepository.getTasks().filter(task => !task.completed);
    }
}

// use case
const taskRepository: ITaskRepository = new TaskRepository();
const taskService: ITaskService = new TaskService(taskRepository);

const taskOne: ITask = taskService.createTask("create request");
const taskTwo: ITask = taskService.createTask("add headers");

console.log(taskService.getPendingTasks());

taskService.completeTask(taskOne.id);

console.log(taskService.getPendingTasks());
