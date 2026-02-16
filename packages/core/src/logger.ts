export type ActionLogLevel = "debug" | "info" | "warn" | "error";

export type ActionLogPhase =
  | "action_start"
  | "context_resolved"
  | "before_action"
  | "handler_complete"
  | "after_action"
  | "validation_complete"
  | "revalidation_complete"
  | "action_error";

export type ActionLogEvent = {
  timestamp: number;
  actionName: string;
  phase: ActionLogPhase;
  level: ActionLogLevel;
  duration?: number;
  data?: unknown;
};

export type LoggerOptions = {
  enabled: boolean;
  level?: ActionLogLevel;
  onLog?: (event: ActionLogEvent) => void;
};

const LOG_LEVELS: Record<ActionLogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

let globalOptions: LoggerOptions = { enabled: false };

export function configureLogger(options: LoggerOptions): void {
  globalOptions = { ...options };
}

export function __resetLoggerForTests(): void {
  globalOptions = { enabled: false };
}

type ActionLogger = {
  log: (phase: ActionLogPhase, level: ActionLogLevel, data?: unknown) => void;
};

const noopLogger: ActionLogger = {
  log: () => {},
};

export function createActionLogger(actionName: string): ActionLogger {
  if (!globalOptions.enabled) {
    return noopLogger;
  }

  const minLevel = LOG_LEVELS[globalOptions.level ?? "debug"];
  const startTime = Date.now();

  return {
    log(phase, level, data) {
      if (LOG_LEVELS[level] < minLevel) {
        return;
      }

      const event: ActionLogEvent = {
        timestamp: Date.now(),
        actionName,
        phase,
        level,
        duration: Date.now() - startTime,
        ...(data !== undefined && { data }),
      };

      if (globalOptions.onLog) {
        globalOptions.onLog(event);
      } else {
        const method = level === "error" ? "error" : level === "warn" ? "warn" : "log";
        console[method](`[zapaction:${actionName}] ${phase}`, event);
      }
    },
  };
}
