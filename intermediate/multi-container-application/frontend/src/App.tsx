import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { APITester } from "./APITester";
import "./index.css";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import logo from "./logo.svg";
import reactLogo from "./react.svg";
import { Button } from "./components/ui/button";
import { ArrowUpIcon, DeleteIcon } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { Input } from "./components/ui/input";

interface Todo {
  id: string;
  content: string;
}

export function RawList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:8080/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error(`Error: ${err}`));
  }, []);

  const handleEditClick = (todo: Todo) => {
    setEditingId(todo.id);
    setInputValue(todo.content);
  };

  const handleAddTodo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    if (editingId) {
      fetch(`http://localhost:8080/todo/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: inputValue }),
      })
        .then((res) => res.json())
        .then((updatedTodo) => {
          // Update the specific item in the array
          setTodos((prev) =>
            prev.map((t) => (t.id === editingId ? updatedTodo : t)),
          );
          resetForm();
        });
    } else {
      fetch("http://localhost:8080/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: inputValue }),
      })
        .then((res) => res.json())
        .then((newTodo) => {
          setTodos((prevTodos) => [...prevTodos, newTodo]);
          resetForm();
        });
    }
  };

  const resetForm = () => {
    setInputValue("");
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    fetch(`http://localhost:8080/todo/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setTodos((prev) => prev.filter((t) => t.id !== id));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="p-8 justify-center bg-slate-50">
      <ScrollArea className="h-96 w-72 rounded-md border bg-white shadow-md">
        <div className="p-4">
          <h2 className="mb-4 text-sm font-medium leading-none text-slate-900">
            {editingId ? "Editing Task..." : "Task List"}
          </h2>

          {todos.map((todo) => (
            <div key={todo.id} onClick={() => handleEditClick(todo)}>
              <div className="py-3 px-2 text-sm hover:bg-blue-50 cursor-pointer rounded transition-all flex justify-between ${editingId === todo.id ? 'bg-blue-100' : ''}">
                {todo.content}
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Submit"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(todo.id);
                  }}
                >
                  <DeleteIcon className="text-red-500" />
                </Button>
              </div>
              <Separator className="my-1" />
            </div>
          ))}
        </div>
      </ScrollArea>
      <form onSubmit={handleAddTodo} className="mt-4">
        <Input
          placeholder={editingId ? "Update task..." : "Add new Todo..."}
          name="todo"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className={editingId ? "border-blue-500 ring-1 ring-blue-500" : ""}
        />
        {editingId && (
          <button
            type="button"
            onClick={resetForm}
            className="text-xs text-gray-500 mt-1 underline"
          >
            Cancel Edit
          </button>
        )}
      </form>
    </div>
  );
}

export function App() {
  return (
    <div className="container mx-auto p-8 text-center relative z-10">
      <div className="flex justify-center items-center gap-8 mb-8">
        {RawList()}
      </div>
    </div>
  );
}

export default App;
