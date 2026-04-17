import express from "express";
import * as mongoose from "mongoose";
import { Todo } from "./src/schema/todo_schema";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set");
}

await mongoose.connect(databaseUrl);

const app = express();
app.use(express.json());

app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find({});
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "Error fetching todos", error });
  }
});

app.post("/todos", async (req, res) => {
  try {
    const newTodo = new Todo({
      content: req.body.content,
    });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(400).json({ error: "Failed to create todo" });
  }
});

app.get("/todo/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    res.json(todo);
  } catch (error) {
    res.status(404).json({ error: "Todo not found" });
  }
});

app.put("/todo/:id", async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.json(updatedTodo);
  } catch (error) {
    res.status(400).json({ error: "Failed to update todo" });
  }
});

app.delete("/todo/:id", async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedTodo) return res.status(404).send("Todo not found");
    res.json(deletedTodo);
  } catch (error) {
    res.status(500).json({ error: "Invalid ID format" });
  }
});

app.listen(3000, () => {
  console.log(`Server is running on port 3000.`);
});
