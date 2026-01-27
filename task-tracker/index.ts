enum Status {
    todo = "todo",
    inprogress = "in-progress",
    done = "done",
}

export type task = {
    id: string;
    description?: string;
    status?: string;
    createdAt?: string;
    updatedAt?: string;
};

async function readTasks(): Promise<task[]> {
    const tasks = Bun.file("tasks.json");
    const content = await tasks.json();
    if (content == null) {
        return [];
    }
    return content;
}

async function add(tasks: task[]) {
    await Bun.write("tasks.json", JSON.stringify(tasks));
}


async function update(updateTask: task) {
    const tasks = await readTasks();
    const taskIndex = tasks.findIndex((task) => task.id == updateTask.id);
    if (taskIndex == -1) {
        console.log("Id is incorrect or Task is not available to update");
        process.exit(1);
    }

    const specificTask = tasks[taskIndex]!;
    const updatedTask: task = {
        id: updateTask.id,
        description: updateTask.description ?? specificTask.description,
        status: updateTask.status ?? specificTask.status,
        createdAt: specificTask.createdAt,
        updatedAt: new Date().toISOString(),
    };
    var newTasks = tasks;
    newTasks[taskIndex] = updatedTask;
    add(newTasks);
    console.log("Task updated!");
}

async function addTask(taskDetail: string | undefined) {
    if (taskDetail == null) {
        console.log("Task detail is required");
        process.exit(1);
    }
    const taskId = crypto.randomUUID();
    const newTask: task = {
        id: taskId,
        description: taskDetail,
        status: Status.todo,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    const tasks = await readTasks();
    const newTasks = [...tasks, newTask];
    add(newTasks);
    console.log(`Task added successfully (ID: ${taskId})`);
}

async function updateTaskDetail(taskId: string | undefined, taskDetail: string | undefined) {
    if (taskId == null || taskDetail == null) {
        console.log("TaskId or Task details cannot be empty");
        process.exit(1);
    }

    const updatedTask: task = {
        id: taskId,
        description: taskDetail,
    };
    await update(updatedTask);
}

async function markTask(status: Status, taskId: string | undefined) {
    if (taskId == null || status == null) {
        console.log("TaskId or status cannot be empty");
        process.exit(1);
    }
    const updatedTask: task = {
        id: taskId,
        status: status,
    }
    await update(updatedTask);
}

function start() {
    const args = Bun.argv[2];
    if (args == null) {
        console.log("No arguments provided");
        process.exit(1);
    }

    switch (args) {
        case "add":
            addTask(Bun.argv[3]);
            break;

        case "update":
            updateTaskDetail(Bun.argv[3], Bun.argv[4])
            break;

        case "delete":
            console.log("Deleting a new task");
            break;

        case "list":
            console.log("Listing a new task");
            break;

        case "mark-in-progress":
            markTask(Status.inprogress, Bun.argv[3])
            break;

        case "mark-done":
            markTask(Status.done, Bun.argv[3])
            break;

        default:
            console.log("Invalid argument");
            break;
    }
}

start();
