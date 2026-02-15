"use client";

import { useState } from "react";

import { useActionMutation, useActionQuery } from "@zapaction/query";

import { createUser, listUsers } from "../app/actions";
import { usersKeys } from "../app/query-keys";

export function UsersPanel() {
  const [name, setName] = useState("");

  const usersQuery = useActionQuery(listUsers, {
    input: {},
    queryKey: usersKeys.all(),
    readPolicy: "read-only",
    staleTime: 10_000,
  });

  const createMutation = useActionMutation(createUser);

  const onCreate = async () => {
    if (!name.trim()) {
      return;
    }

    await createMutation.mutateAsync({ name });
    setName("");
  };

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>ZapAction Example</h1>
      <p>Server tags and client invalidation share the same `users` tag.</p>

      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="User name"
        />
        <button onClick={onCreate} disabled={createMutation.isPending}>
          {createMutation.isPending ? "Creating..." : "Create user"}
        </button>
      </div>

      <ul>
        {(usersQuery.data ?? []).map((user) => (
          <li key={user.id}>
            {user.name} ({user.tenantId})
          </li>
        ))}
      </ul>
    </main>
  );
}
