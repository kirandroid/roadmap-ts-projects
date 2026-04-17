import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  content: { type: String, required: true },
});

todoSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    const result = ret as Record<string, any>;
    delete result._id;
    return result;
  },
});

export type Todo = mongoose.InferSchemaType<typeof todoSchema>;
export const Todo = mongoose.model("Todo", todoSchema);
