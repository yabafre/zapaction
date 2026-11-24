# ZapAction - Context7

## What is ZapAction

ZapAction keeps Next.js Server Actions and TanStack Query in sync with tag-driven cache invalidation.

It provides:
- `defineAction` with Zod validation
- `setActionContext` for server context injection
- `createQueryKeys` / `createFeatureKeys` for typed query keys
- `createFeatureTags` + `setTagRegistry` for cross-layer cache invalidation
- `useAction`, `useActionQuery`, and `useActionMutation` hooks

Works with:
- Next.js App Router (`>= 15`, including Next.js 16 with `revalidateTag(tag, profile)` and `updateTag(tag)`)
- React (`>= 18.3`, including React 19)
- TanStack Query (`>= 5`)
- Zod (`>= 4`)
- npm, pnpm, yarn, bun

## Core Concepts

### Feature-first architecture

```txt
features/
  products/
    _actions/
    _queries/
    _hooks/
    _components/
```

```txt
RSC -> Client Component -> useActionQuery/useActionMutation -> Server Action
```

### Feature keys and tags

```ts
import { createFeatureKeys, createFeatureTags } from "@zapaction/core";

export const productKeys = createFeatureKeys("products", {
  list: () => ["list"],
  detail: (id: string) => ["detail", id],
});

export const productTags = createFeatureTags("products", {
  list: () => ["list"],
  detail: (id: string) => ["detail", id],
});
```

`productKeys.detail("p1")` => `["products", "detail", "p1"]`  
`productTags.detail("p1")` => `"products:detail:p1"`

## Practical Recipes (High-Signal)

### 1) `createUser` action with Zod input/output

```ts
import { defineAction } from "@zapaction/core";
import { z } from "zod";

type User = { id: string; name: string; email: string };
const users = new Map<string, User>();

export const createUser = defineAction({
  input: z.object({
    name: z.string().min(1),
    email: z.string().email(),
  }),
  output: z.object({
    id: z.string(),
    email: z.string().email(),
  }),
  tags: ["users"],
  handler: async ({ input }) => {
    const duplicate = Array.from(users.values()).some((user) => user.email === input.email);
    if (duplicate) {
      throw new Error("Email already in use");
    }

    const id = crypto.randomUUID();
    users.set(id, { id, name: input.name, email: input.email });
    return { id, email: input.email };
  },
});
```

### 2) Global context (`userId`, `isAdmin`) with `setActionContext`

```ts
import { defineAction, setActionContext } from "@zapaction/core";
import { z } from "zod";

type AppContext = {
  userId: string;
  isAdmin: boolean;
};

setActionContext<AppContext>(async () => {
  const session = { user: { id: "u_123", role: "admin" as const } };
  return {
    userId: session.user.id,
    isAdmin: session.user.role === "admin",
  };
});

export const whoAmI = defineAction<{}, { userId: string; isAdmin: boolean }, AppContext>({
  input: z.object({}),
  output: z.object({
    userId: z.string(),
    isAdmin: z.boolean(),
  }),
  handler: async ({ ctx }) => ({
    userId: ctx.userId,
    isAdmin: ctx.isAdmin,
  }),
});
```

### 3) React button + `useAction` for `submitForm`

```ts
// app/actions.ts
import { defineAction } from "@zapaction/core";
import { z } from "zod";

export const submitForm = defineAction({
  input: z.object({ message: z.string().min(1) }),
  output: z.object({ success: z.boolean() }),
  handler: async ({ input }) => {
    console.log("message:", input.message);
    return { success: true };
  },
});
```

```tsx
// components/submit-form-button.tsx
"use client";

import { useState } from "react";
import { useAction } from "@zapaction/react";
import { submitForm } from "../app/actions";

export function SubmitFormButton() {
  const [message, setMessage] = useState("");
  const action = useAction(submitForm);

  const handleClick = async () => {
    const result = await action.execute({ message });
    if (result.success) {
      setMessage("");
    }
  };

  return (
    <div>
      <input value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={handleClick} disabled={action.isPending}>
        {action.isPending ? "Sending..." : "Send"}
      </button>
    </div>
  );
}
```

### 4) `getPosts` + optional `limit` with `useActionQuery`

```ts
// app/actions.ts
import { defineAction } from "@zapaction/core";
import { z } from "zod";

const postSchema = z.object({
  id: z.string(),
  title: z.string(),
});

const posts = [
  { id: "p1", title: "First post" },
  { id: "p2", title: "Second post" },
  { id: "p3", title: "Third post" },
];

export const getPosts = defineAction({
  input: z.object({
    limit: z.number().int().positive().optional(),
  }),
  output: z.array(postSchema),
  handler: async ({ input }) => {
    return typeof input.limit === "number" ? posts.slice(0, input.limit) : posts;
  },
});
```

```tsx
// components/posts-list.tsx
"use client";

import { createFeatureKeys } from "@zapaction/core";
import { useActionQuery } from "@zapaction/query";
import { getPosts } from "../app/actions";

const postKeys = createFeatureKeys("posts", {
  list: (limit?: number) => ["list", limit ?? "all"],
});

export function PostsList({ limit }: { limit?: number }) {
  const query = useActionQuery(getPosts, {
    input: { limit },
    queryKey: postKeys.list(limit),
    readPolicy: "read-only",
  });

  if (query.isPending) return <p>Loading...</p>;
  if (query.isError) return <p>Failed to load posts</p>;

  return (
    <ul>
      {query.data?.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

### 5) `updateProfile` + `useActionMutation`

```ts
// app/actions.ts
import { defineAction } from "@zapaction/core";
import { z } from "zod";

const emailsByUserId = new Map<string, string>([["u_1", "old@mail.com"]]);

export const updateProfile = defineAction({
  input: z.object({
    userId: z.string(),
    newEmail: z.string().email(),
  }),
  output: z.object({
    email: z.string().email(),
  }),
  tags: ["users"],
  handler: async ({ input }) => {
    emailsByUserId.set(input.userId, input.newEmail);
    return { email: input.newEmail };
  },
});
```

```tsx
// components/profile-email-form.tsx
"use client";

import { useState } from "react";
import { useActionMutation } from "@zapaction/query";
import { updateProfile } from "../app/actions";

export function ProfileEmailForm({ userId }: { userId: string }) {
  const [newEmail, setNewEmail] = useState("");
  const mutation = useActionMutation(updateProfile);

  const onSave = async () => {
    const result = await mutation.mutateAsync({ userId, newEmail });
    console.log("Updated email:", result.email);
  };

  return (
    <div>
      <input value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
      <button onClick={onSave} disabled={mutation.isPending}>
        Save
      </button>
    </div>
  );
}
```

### 6) Revalidate all `posts` queries after creating a blog post

```ts
// app/query-model.ts
import { createFeatureKeys, createFeatureTags } from "@zapaction/core";

export const postKeys = createFeatureKeys("posts", {
  list: () => ["list"],
});

export const postTags = createFeatureTags("posts", {
  list: () => ["list"],
});
```

```ts
// app/actions.ts (server)
import { defineAction } from "@zapaction/core";
import { z } from "zod";
import { postTags } from "./query-model";

export const createBlogPost = defineAction({
  input: z.object({ title: z.string().min(1) }),
  output: z.object({ id: z.string(), title: z.string() }),
  tags: [postTags.all()],
  handler: async ({ input }) => ({ id: crypto.randomUUID(), title: input.title }),
});
```

```tsx
// app/providers.tsx (client)
import { setTagRegistry } from "@zapaction/query";
import { postKeys, postTags } from "./query-model";

setTagRegistry({
  [postTags.all()]: [postKeys.list()],
});
```

`useActionMutation(createBlogPost)` will automatically call `invalidateTags` on success.

### 7) Invalidate all TanStack caches linked to `users` after delete

```ts
// app/query-model.ts
import { createFeatureTags } from "@zapaction/core";

export const userTags = createFeatureTags("users", {
  list: () => ["list"],
  detail: (userId: string) => ["detail", userId],
});
```

```tsx
// app/providers.tsx
import { setTagRegistry } from "@zapaction/query";
import { userTags } from "./query-model";

setTagRegistry({
  [userTags.all()]: [["users"]],
});
```

```ts
// app/actions.ts
import { defineAction } from "@zapaction/core";
import { z } from "zod";
import { userTags } from "./query-model";

export const deleteUser = defineAction({
  input: z.object({ userId: z.string() }),
  output: z.object({ deleted: z.literal(true) }),
  tags: [userTags.all()],
  handler: async () => ({ deleted: true }),
});
```

`["users"]` is a prefix key, so all queries starting with `["users", ...]` are invalidated.

### 8) Typed key for `getProductDetails` with `createQueryKeys`

```ts
import { createQueryKeys, defineAction } from "@zapaction/core";
import { useActionQuery } from "@zapaction/query";
import { z } from "zod";

export const getProductDetails = defineAction({
  input: z.object({ productId: z.string() }),
  output: z.object({ id: z.string(), title: z.string(), price: z.number() }),
  handler: async ({ input }) => ({
    id: input.productId,
    title: "Demo product",
    price: 42,
  }),
});

export const queryKeys = createQueryKeys({
  getProductDetails: (productId: string) => ["products", "detail", productId] as const,
});

const productId = "p_123";
const productQuery = useActionQuery(getProductDetails, {
  input: { productId },
  queryKey: queryKeys.getProductDetails(productId),
  readPolicy: "read-only",
});
```

### 9) Admin-only `deleteSensitiveData` with `setActionContext`

```ts
import { defineAction, setActionContext } from "@zapaction/core";
import { z } from "zod";

type AppContext = { userId: string; isAdmin: boolean };

setActionContext<AppContext>(async () => ({
  userId: "u_123",
  isAdmin: true,
}));

export const deleteSensitiveData = defineAction<
  { recordId: string },
  { deleted: true },
  AppContext
>({
  input: z.object({ recordId: z.string() }),
  output: z.object({ deleted: z.literal(true) }),
  beforeAction: ({ ctx }) => {
    if (!ctx.isAdmin) {
      throw new Error("Forbidden");
    }
  },
  handler: async () => ({ deleted: true }),
});
```

### 10) Invalidate `postDetails` (specific post) + `recentComments` (global)

For entity-specific invalidation, pass runtime tags via `invalidateWithTags`.

```ts
// app/query-model.ts
import { createFeatureKeys, createFeatureTags } from "@zapaction/core";

export const postKeys = createFeatureKeys("posts", {
  detail: (postId: string) => ["detail", postId],
});
export const commentKeys = createFeatureKeys("comments", {
  recent: () => ["recent"],
});

export const postTags = createFeatureTags("posts", {
  detail: (postId: string) => ["detail", postId],
});
export const commentTags = createFeatureTags("comments", {
  recent: () => ["recent"],
});
```

```tsx
// app/providers.tsx
import { setTagRegistry } from "@zapaction/query";
import { commentKeys, commentTags, postKeys, postTags } from "./query-model";

const postId = "post_42";
setTagRegistry({
  [postTags.detail(postId)]: [postKeys.detail(postId)],
  [commentTags.recent()]: [commentKeys.recent()],
});
```

```ts
// app/actions.ts
import { defineAction } from "@zapaction/core";
import { z } from "zod";

export const createComment = defineAction({
  input: z.object({
    postId: z.string(),
    message: z.string().min(1),
  }),
  output: z.object({
    id: z.string(),
    postId: z.string(),
    message: z.string(),
  }),
  handler: async ({ input }) => ({
    id: crypto.randomUUID(),
    postId: input.postId,
    message: input.message,
  }),
});
```

```tsx
// components/comment-form.tsx
"use client";

import { useActionMutation } from "@zapaction/query";
import { createComment } from "../app/actions";
import { commentTags, postTags } from "../app/query-model";

export function CommentForm({ postId }: { postId: string }) {
  const mutation = useActionMutation(createComment, {
    invalidateWithTags: [postTags.detail(postId), commentTags.recent()],
  });

  return (
    <button
      onClick={() => mutation.mutate({ postId, message: "Nice post!" })}
      disabled={mutation.isPending}
    >
      Add comment
    </button>
  );
}
```

## Installation

```bash
# npm
npm install @zapaction/core @zapaction/query @zapaction/react zod

# pnpm
pnpm add @zapaction/core @zapaction/query @zapaction/react zod

# yarn
yarn add @zapaction/core @zapaction/query @zapaction/react zod

# bun
bun add @zapaction/core @zapaction/query @zapaction/react zod
```

## Docs map

- Getting Started
- Guide -> setup, architecture, React Query, auth, middleware, troubleshooting
- Examples -> full CRUD, products/cart module
- API Reference -> defineAction, useAction, useActionQuery, useActionMutation, cache tags

## i18n routing

- Locale paths: `/en/*` and `/fr/*`
- Root redirects to default locale

## When to use ZapAction

Use ZapAction if you:
- already use Next.js Server Actions
- use TanStack Query on the client
- want predictable invalidation without hand-written cache glue
- prefer feature-first architecture over global utility sprawl
