"use client";

import { setTagRegistry } from "@zapaction/query";

import { usersKeys } from "./query-keys";

setTagRegistry({
  users: [usersKeys.all()],
});
