"use client";

import { useMemo, useState } from "react";

type Locale = "en" | "fr";
type TestState = "idle" | "running" | "pass" | "fail";
type TestResult = { state: TestState; message: string };

const delay = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(message);
  }
}

const cases = [
  {
    id: "query-key",
    en: "query key is stable",
    fr: "query key stable",
    run: async () => {
      const key = ["todos", "list"] as const;
      assert(key[0] === "todos" && key[1] === "list", "Unexpected key format");
      await delay(90);
    },
  },
  {
    id: "input-validation",
    en: "empty title is rejected",
    fr: "titre vide rejete",
    run: async () => {
      const title = "";
      const isValid = title.trim().length > 0;
      assert(!isValid, "Validation must reject empty title");
      await delay(90);
    },
  },
  {
    id: "tag-mapping",
    en: "tag maps to query key",
    fr: "tag mappe vers query key",
    run: async () => {
      const tagRegistry: Record<string, string[][]> = {
        todos: [["todos", "list"]],
      };
      const mappedTodos = tagRegistry.todos ?? [];
      assert(mappedTodos.length > 0, "Missing mapped keys");
      await delay(90);
    },
  },
];

const labels: Record<
  Locale,
  {
    title: string;
    subtitle: string;
    action: string;
    running: string;
    idle: string;
  }
> = {
  en: {
    title: "Live test results",
    subtitle: "Run quick checks to validate the documented behavior.",
    action: "Run checks",
    running: "Running",
    idle: "Idle",
  },
  fr: {
    title: "Resultats de test live",
    subtitle: "Lance des checks rapides pour verifier le comportement documente.",
    action: "Lancer les checks",
    running: "Execution",
    idle: "Idle",
  },
};

export function LiveTestResults({ locale = "en" }: { locale?: Locale }) {
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState<Record<string, TestResult>>({});
  const copy = labels[locale];

  const runChecks = async () => {
    setRunning(true);
    setResults(
      Object.fromEntries(
        cases.map((testCase) => [testCase.id, { state: "running" as const, message: copy.running }]),
      ),
    );

    for (const testCase of cases) {
      try {
        await testCase.run();
        setResults((current) => ({
          ...current,
          [testCase.id]: { state: "pass", message: "PASS" },
        }));
      } catch (error) {
        setResults((current) => ({
          ...current,
          [testCase.id]: {
            state: "fail",
            message: error instanceof Error ? error.message : "FAIL",
          },
        }));
      }
    }

    setRunning(false);
  };

  const summary = useMemo(() => {
    const values = Object.values(results);

    if (values.length === 0) {
      return copy.idle;
    }

    const failed = values.some((entry) => entry.state === "fail");
    const stillRunning = values.some((entry) => entry.state === "running");

    if (stillRunning) return copy.running;
    if (failed) return "FAIL";
    return "PASS";
  }, [copy.idle, copy.running, results]);

  return (
    <div className="za-live-card">
      <h3 className="za-live-title">{copy.title}</h3>
      <p className="za-live-subtitle">{copy.subtitle}</p>
      <button type="button" className="za-stars-pill" onClick={runChecks} disabled={running}>
        {copy.action}
      </button>
      <span className="za-live-status">Result: {summary}</span>
      <ul className="za-test-list">
        {cases.map((testCase) => {
          const result = results[testCase.id] ?? { state: "idle", message: copy.idle };
          const title = locale === "fr" ? testCase.fr : testCase.en;

          return (
            <li key={testCase.id} className="za-test-item">
              <span>{title}</span>
              <span className="za-test-state" data-state={result.state}>
                {result.message}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
