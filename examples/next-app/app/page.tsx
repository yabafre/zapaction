import "./bootstrap.server";

import { UsersPanel } from "../components/users-panel";
import { Providers } from "./providers";

export default function Page() {
  return (
    <Providers>
      <UsersPanel />
    </Providers>
  );
}
