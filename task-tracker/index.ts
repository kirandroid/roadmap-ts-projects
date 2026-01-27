enum Status {
    todo = "todo",
    inprogress = "in-progress",
    done = "done",
}

export type task = {
    id: string;
    description: string;
    status: string;
    createdAt: string;
    updatedAt: string;
};

async function readTasks(): Promise<task[]> {
    const tasks = Bun.file("tasks.json");
    const content = await tasks.json();
    if (content == null) {
        return [];
    }
    return content;
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
    Bun.write("tasks.json", JSON.stringify(newTasks));
    console.log(`Task added successfully (ID: ${taskId})`);
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
            console.log("Updating a new task");
            break;

        case "delete":
            console.log("Deleting a new task");
            break;

        case "list":
            console.log("Listing a new task");
            break;

        case "mark-in-progress":
            console.log("Mark task as in progress");
            break;

        case "mark-done":
            console.log("Mark task as done");
            break;

        default:
            console.log("Invalid argument");
            break;
    }
}

start();
