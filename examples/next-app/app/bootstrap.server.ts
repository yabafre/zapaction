import "server-only";

import { setActionContext } from "@zapaction/core";

setActionContext(async () => ({
  tenantId: "demo-tenant",
}));
