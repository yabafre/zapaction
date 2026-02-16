"use client";

import { useEffect, useMemo, useState } from "react";

type Locale = "en" | "fr";
type QueryStatus = "idle" | "loading" | "success" | "error";

const DEBOUNCE_MS = 280;

async function fetchGreeting(input: string) {
  await new Promise((resolve) => {
    setTimeout(resolve, 220);
  });

  const normalized = input.trim();

  if (normalized.toLowerCase() === "error") {
    throw new Error("Synthetic server error");
  }

  return `Hello World: ${normalized || "friend"}`;
}

const labels: Record<
  Locale,
  {
    title: string;
    subtitle: string;
    placeholder: string;
    status: string;
    idle: string;
    loading: string;
    success: string;
    error: string;
  }
> = {
  en: {
    title: "Say hello",
    subtitle: "This demo refetches as you type, similar to a query client flow.",
    placeholder: "Type something (try: test)",
    status: "Status",
    idle: "idle",
    loading: "loading",
    success: "success",
    error: "error",
  },
  fr: {
    title: "Dis bonjour",
    subtitle: "Cette demo relance la requete pendant la saisie.",
    placeholder: "Ecris quelque chose (ex: test)",
    status: "Statut",
    idle: "idle",
    loading: "loading",
    success: "success",
    error: "error",
  },
};

export function LiveHelloCard({ locale = "en" }: { locale?: Locale }) {
  const [input, setInput] = useState("test");
  const [status, setStatus] = useState<QueryStatus>("idle");
  const [result, setResult] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const copy = labels[locale];

  useEffect(() => {
    let active = true;

    setStatus("loading");
    setErrorMessage("");

    const timer = setTimeout(async () => {
      try {
        const greeting = await fetchGreeting(input);
        if (!active) {
          return;
        }

        setResult(greeting);
        setStatus("success");
      } catch (error) {
        if (!active) {
          return;
        }

        setResult("");
        setStatus("error");
        setErrorMessage(error instanceof Error ? error.message : "Unknown error");
      }
    }, DEBOUNCE_MS);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [input]);

  const statusText = useMemo(() => {
    if (status === "idle") return copy.idle;
    if (status === "loading") return copy.loading;
    if (status === "success") return copy.success;
    return copy.error;
  }, [copy.error, copy.idle, copy.loading, copy.success, status]);

  return (
    <div className="za-live-card">
      <h3 className="za-live-title">{copy.title}</h3>
      <p className="za-live-subtitle">{copy.subtitle}</p>
      <input
        className="za-live-input"
        value={input}
        onChange={(event) => setInput(event.target.value)}
        placeholder={copy.placeholder}
      />
      <p className="za-live-result">{status === "error" ? errorMessage : result}</p>
      <span className="za-live-status">
        {copy.status}: {statusText}
      </span>
    </div>
  );
}
