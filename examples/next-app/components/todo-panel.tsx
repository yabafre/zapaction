"use client";

import { useState, type FormEvent } from "react";

import { useActionMutation, useActionQuery } from "@zapaction/query";
import { ActionErrorBoundary, useActionErrorReset } from "@zapaction/react";

import { createTodo, deleteTodo, listTodos, toggleTodo } from "../app/actions";
import { appKeys } from "../app/query-keys";

// ---------------------------------------------------------------------------
// Error boundary fallback
// ---------------------------------------------------------------------------

function ErrorFallback() {
    const { error, reset } = useActionErrorReset();

    return (
        <div className="error-banner">
            <p><strong>Something went wrong</strong></p>
            <p>{String(error)}</p>
            <button type="button" onClick={reset}>Retry</button>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function TodoPanel() {
    return (
        <ActionErrorBoundary fallback={<ErrorFallback />}>
            <TodoPanelContent />
        </ActionErrorBoundary>
    );
}

function TodoPanelContent() {
    const [title, setTitle] = useState("");

    // Read todos via useActionQuery (tag: "todos")
    const todosQuery = useActionQuery(listTodos, {
        input: {},
        queryKey: appKeys.todos(),
        readPolicy: "read-only",
    });

    // Write mutations — tag invalidation auto-refreshes todosQuery
    const createMutation = useActionMutation(createTodo);
    const toggleMutation = useActionMutation(toggleTodo);
    const deleteMutation = useActionMutation(deleteTodo);

    if (todosQuery.error) throw todosQuery.error;
    if (todosQuery.isPending) return <p className="loading">Loading todos...</p>;

    const todos = todosQuery.data ?? [];
    const isBusy = createMutation.isPending || toggleMutation.isPending || deleteMutation.isPending;

    async function handleCreate(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!title.trim()) return;
        await createMutation.mutateAsync({ title });
        setTitle("");
    }

    return (
        <section className="todo-panel">
            {/* Create form */}
            <form onSubmit={handleCreate} className="create-form">
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="What needs to be done?"
                    aria-label="New todo title"
                />
                <button type="submit" disabled={createMutation.isPending}>
                    {createMutation.isPending ? "Adding..." : "Add"}
                </button>
            </form>

            {/* Summary */}
            <p className="summary">
                {todos.filter((t) => !t.done).length} remaining · {todos.filter((t) => t.done).length} done
            </p>

            {/* List */}
            {todos.length === 0 ? (
                <p className="empty">No todos yet. Add one above!</p>
            ) : (
                <ul className="todo-list">
                    {todos.map((todo) => (
                        <li key={todo.id} className={todo.done ? "done" : ""}>
                            <button
                                type="button"
                                className="toggle"
                                onClick={() => toggleMutation.mutateAsync({ id: todo.id })}
                                disabled={toggleMutation.isPending}
                                aria-label={todo.done ? "Mark as not done" : "Mark as done"}
                            >
                                {todo.done ? "✓" : "○"}
                            </button>

                            <span className="title">{todo.title}</span>

                            <button
                                type="button"
                                className="delete"
                                onClick={() => deleteMutation.mutateAsync({ id: todo.id })}
                                disabled={deleteMutation.isPending}
                                aria-label="Delete todo"
                            >
                                ×
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {isBusy && <p className="busy">Saving...</p>}
        </section>
    );
}
