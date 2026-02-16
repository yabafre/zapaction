"use server";

import { defineAction, setActionContext, configureLogger } from "@zapaction/core";
import { z } from "zod";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

const todoSchema = z.object({
  id: z.string(),
  title: z.string(),
  done: z.boolean(),
  createdAt: z.string(),
});

type Todo = z.infer<typeof todoSchema>;

// ---------------------------------------------------------------------------
// In-memory store (replaced by a real DB in production)
// ---------------------------------------------------------------------------

const todos: Todo[] = [
  { id: "1", title: "Read the ZapAction docs", done: true, createdAt: new Date().toISOString() },
  { id: "2", title: "Set up tag-based invalidation", done: false, createdAt: new Date().toISOString() },
  { id: "3", title: "Add error boundaries", done: false, createdAt: new Date().toISOString() },
];

let nextId = 4;

// ---------------------------------------------------------------------------
// Context — available in every action via `ctx`
// ---------------------------------------------------------------------------

setActionContext(async () => ({
  userId: "user-1",
}));

// ---------------------------------------------------------------------------
// Logger (optional — enable to see pipeline phases in server console)
// ---------------------------------------------------------------------------

configureLogger({ enabled: false, level: "debug" });

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------

/** List all todos */
export const listTodos = defineAction({
  name: "listTodos",
  input: z.object({}),
  output: z.array(todoSchema),
  handler: async () => {
    return [...todos].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  },
});

/** Create a new todo */
export const createTodo = defineAction({
  name: "createTodo",
  input: z.object({
    title: z.string().min(1, "Title is required"),
  }),
  output: todoSchema,
  tags: ["todos"],
  handler: async ({ input }) => {
    const todo: Todo = {
      id: String(nextId++),
      title: input.title.trim(),
      done: false,
      createdAt: new Date().toISOString(),
    };
    todos.push(todo);
    return todo;
  },
});

/** Toggle the done status of a todo */
export const toggleTodo = defineAction({
  name: "toggleTodo",
  input: z.object({
    id: z.string(),
  }),
  output: todoSchema,
  tags: ["todos"],
  beforeAction: ({ input }) => {
    const exists = todos.some((t) => t.id === input.id);
    if (!exists) throw new Error("Todo not found");
  },
  handler: async ({ input }) => {
    const todo = todos.find((t) => t.id === input.id)!;
    todo.done = !todo.done;
    return { ...todo };
  },
});

/** Delete a todo */
export const deleteTodo = defineAction({
  name: "deleteTodo",
  input: z.object({
    id: z.string(),
  }),
  output: z.object({ deleted: z.boolean() }),
  tags: ["todos"],
  beforeAction: ({ input }) => {
    const exists = todos.some((t) => t.id === input.id);
    if (!exists) throw new Error("Todo not found");
  },
  handler: async ({ input }) => {
    const index = todos.findIndex((t) => t.id === input.id);
    todos.splice(index, 1);
    return { deleted: true };
  },
});
