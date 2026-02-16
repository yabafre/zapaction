import { TodoPanel } from "../components/todo-panel";
import { Providers } from "./providers";

export default function Page() {
  return (
    <main className="container">
      <header>
        <h1>ZapAction Todo</h1>
        <p>
          A minimal Next.js app showing <code>defineAction</code>,{" "}
          <code>useActionQuery</code>, <code>useActionMutation</code>, and{" "}
          <code>ActionErrorBoundary</code> working together.
        </p>
      </header>

      <Providers>
        <TodoPanel />
      </Providers>

      <footer>
        <p>
          View the{" "}
          <a href="https://github.com/yabafre/zapaction" target="_blank" rel="noreferrer">
            source on GitHub
          </a>{" "}
          · Powered by <strong>ZapAction</strong>
        </p>
      </footer>
    </main>
  );
}
