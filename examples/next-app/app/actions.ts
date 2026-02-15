"use server";

import "./bootstrap.server";

import { defineAction } from "@zapaction/core";
import { z } from "zod";

const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  tenantId: z.string(),
});

// Demo-only volatile storage. Replace with durable persistence in production.
const users: Array<z.infer<typeof userSchema>> = [];

export const listUsers = defineAction({
  input: z.object({}),
  output: z.array(userSchema),
  tags: ["users"],
  handler: async () => users,
});

export const createUser = defineAction({
  input: z.object({ name: z.string().min(1) }),
  output: userSchema,
  tags: ["users"],
  handler: async ({ input, ctx }: { input: { name: string }; ctx: { tenantId: string } }) => {
    const newUser = {
      id: `user-${users.length + 1}`,
      name: input.name,
      tenantId: ctx.tenantId,
    };

    users.push(newUser);
    return newUser;
  },
});
